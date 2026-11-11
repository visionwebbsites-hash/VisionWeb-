from dotenv import load_dotenv
from pathlib import Path
load_dotenv(Path(__file__).parent / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, UploadFile, File, Form
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import os, io, base64, logging, uuid, bcrypt, jwt
from datetime import datetime, timezone, timedelta
from PIL import Image

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
JWT_HOURS = 12

def get_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()

def verify_password(p: str, h: str) -> bool:
    return bcrypt.checkpw(p.encode(), h.encode())

def create_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_HOURS)}
    return jwt.encode(payload, get_secret(), algorithm=JWT_ALGORITHM)

async def get_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        raise HTTPException(401, "Não autenticado")
    try:
        payload = jwt.decode(token, get_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(401, "Token inválido ou expirado")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(401, "Acesso negado")
    return user

# ---------- modelos ----------
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    text: str
    approved: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class TestimonialCreate(BaseModel):
    name: str
    text: str

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    service: Optional[str] = None
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LeadCreate(BaseModel):
    name: str
    phone: str
    service: Optional[str] = None
    message: Optional[str] = None

class LoginInput(BaseModel):
    email: str
    password: str

class VideoInput(BaseModel):
    category: str
    url: str
    title: Optional[str] = None

class OrderInput(BaseModel):
    ordered_ids: List[str]

class BannerUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cta_label: Optional[str] = None
    link: Optional[str] = None
    active: Optional[bool] = None

# ---------- público ----------
@api_router.get("/")
async def root():
    return {"message": "Senhorita M — API"}

@api_router.get("/health")
async def health():
    await db.command("ping")
    return {"status": "ok", "database": "ok"}

@api_router.get("/testimonials")
async def list_testimonials():
    items = await db.testimonials.find({"approved": True}, {"_id": 0}).to_list(100)
    return {"testimonials": items}

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    obj = Testimonial(**input.model_dump())
    await db.testimonials.insert_one(obj.model_dump())
    return obj

@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    obj = Lead(**input.model_dump())
    await db.leads.insert_one(obj.model_dump())
    return obj

@api_router.get("/media")
async def list_media(category: str):
    items = await db.media.find({"category": category}, {"_id": 0, "data": 0}).sort("order", 1).to_list(500)
    for m in items:
        m["url"] = f"/api/media/file/{m['id']}"
    return {"items": items}

@api_router.get("/media/file/{media_id}")
async def media_file(media_id: str):
    doc = await db.media.find_one({"id": media_id})
    if not doc:
        raise HTTPException(404, "Mídia não encontrada")
    return Response(content=base64.b64decode(doc["data"]), media_type=doc.get("content_type", "image/jpeg"))

@api_router.get("/videos")
async def list_videos(category: Optional[str] = None):
    q = {"category": category} if category else {}
    items = await db.videos.find(q, {"_id": 0}).to_list(100)
    return {"items": items}

@api_router.get("/banners/active")
async def active_banners():
    items = await db.banners.find({"active": True}, {"_id": 0, "image_data": 0}).sort("created_at", -1).to_list(10)
    for b in items:
        if b.get("has_image"):
            b["image_url"] = f"/api/banners/file/{b['id']}"
    return {"items": items}

@api_router.get("/banners/file/{banner_id}")
async def banner_file(banner_id: str):
    doc = await db.banners.find_one({"id": banner_id})
    if not doc or not doc.get("image_data"):
        raise HTTPException(404, "Imagem não encontrada")
    return Response(content=base64.b64decode(doc["image_data"]), media_type="image/jpeg")

# ---------- auth ----------
@api_router.post("/admin/login")
async def admin_login(input: LoginInput, request: Request):
    email = input.email.strip().lower()
    ident = f"{request.client.host}:{email}"
    att = await db.login_attempts.find_one({"identifier": ident})
    if att and att.get("count", 0) >= 5:
        locked = datetime.fromisoformat(att["last"]).timestamp() > datetime.now(timezone.utc).timestamp() - 900
        if locked:
            raise HTTPException(429, "Muitas tentativas. Aguarde 15 minutos.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": ident},
            {"$inc": {"count": 1}, "$set": {"last": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
        raise HTTPException(401, "E-mail ou senha incorretos")
    await db.login_attempts.delete_one({"identifier": ident})
    return {"token": create_token(user["id"], email), "user": {"email": email, "name": user.get("name", "Admin")}}

@api_router.get("/admin/me")
async def admin_me(admin=Depends(get_admin)):
    return admin

# ---------- admin: mídias ----------
def optimize_image(raw: bytes) -> bytes:
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    w, h = im.size
    scale = min(1.0, 1600 / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=80, optimize=True, progressive=True)
    return buf.getvalue()

@api_router.post("/admin/media")
async def upload_media(
    file: UploadFile = File(...),
    category: str = Form(...),
    procedure: Optional[str] = Form(None),
    admin=Depends(get_admin),
):
    raw = optimize_image(await file.read())
    count = await db.media.count_documents({"category": category})
    doc = {
        "id": str(uuid.uuid4()),
        "category": category,
        "procedure": procedure,
        "filename": file.filename,
        "content_type": "image/jpeg",
        "data": base64.b64encode(raw).decode(),
        "order": count,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.media.insert_one(doc)
    return {"id": doc["id"], "category": category, "procedure": procedure, "order": count, "url": f"/api/media/file/{doc['id']}"}

@api_router.delete("/admin/media/{media_id}")
async def delete_media(media_id: str, admin=Depends(get_admin)):
    res = await db.media.delete_one({"id": media_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Mídia não encontrada")
    return {"deleted": True}

@api_router.put("/admin/media/order")
async def reorder_media(input: OrderInput, admin=Depends(get_admin)):
    for i, mid in enumerate(input.ordered_ids):
        await db.media.update_one({"id": mid}, {"$set": {"order": i}})
    return {"ok": True}

# ---------- admin: vídeos ----------
@api_router.post("/admin/videos")
async def create_video(input: VideoInput, admin=Depends(get_admin)):
    doc = {"id": str(uuid.uuid4()), **input.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()}
    await db.videos.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api_router.delete("/admin/videos/{video_id}")
async def delete_video(video_id: str, admin=Depends(get_admin)):
    res = await db.videos.delete_one({"id": video_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Vídeo não encontrado")
    return {"deleted": True}

# ---------- admin: banners ----------
@api_router.get("/admin/banners")
async def admin_banners(admin=Depends(get_admin)):
    items = await db.banners.find({}, {"_id": 0, "image_data": 0}).sort("created_at", -1).to_list(100)
    for b in items:
        if b.get("has_image"):
            b["image_url"] = f"/api/banners/file/{b['id']}"
    return {"items": items}

@api_router.post("/admin/banners")
async def create_banner(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    cta_label: Optional[str] = Form(None),
    link: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    admin=Depends(get_admin),
):
    doc = {
        "id": str(uuid.uuid4()),
        "title": title,
        "description": description,
        "cta_label": cta_label,
        "link": link,
        "position": "home-topo",
        "active": False,
        "has_image": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    if file is not None:
        doc["image_data"] = base64.b64encode(optimize_image(await file.read())).decode()
        doc["has_image"] = True
    await db.banners.insert_one(doc)
    doc.pop("_id", None)
    doc.pop("image_data", None)
    return doc

@api_router.put("/admin/banners/{banner_id}")
async def update_banner(banner_id: str, input: BannerUpdate, admin=Depends(get_admin)):
    update = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(400, "Nada para atualizar")
    await db.banners.update_one({"id": banner_id}, {"$set": update})
    return {"ok": True}

@api_router.delete("/admin/banners/{banner_id}")
async def delete_banner(banner_id: str, admin=Depends(get_admin)):
    res = await db.banners.delete_one({"id": banner_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Banner não encontrado")
    return {"deleted": True}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[origin.strip().rstrip('/') for origin in os.environ.get('CORS_ORIGINS', '').split(',') if origin.strip() and origin.strip() != '*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

ESTETICA_SEED = {
    "estetica-01-drenagem.png": "drenagem-linfatica",
    "estetica-02-modeladora.png": "massagem-modeladora",
    "estetica-03-relaxante.png": "massagem-relaxante",
    "estetica-04-ventosaterapia.png": "ventosaterapia",
    "estetica-05-terapeutica.png": "massagem-terapeutica",
}

@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    email = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    if email:
        existing = await db.users.find_one({"email": email})
        if existing is None:
            await db.users.insert_one({
                "id": str(uuid.uuid4()),
                "email": email,
                "password_hash": hash_password(os.environ["ADMIN_PASSWORD"]),
                "name": "Alexandre",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            logger.info("Administrador inicial criado com senha protegida")
    materiais = Path(os.environ.get("MATERIAIS_DIR", str(Path(__file__).resolve().parent.parent / "materiais")))
    if not materiais.is_dir():
        logger.warning("Diretorio de materiais ausente; importacao inicial adiada")
        return
    imported = {"cabelos": 0, "manicure": 0, "estetica": 0}
    for category in imported:
        last = await db.media.find_one({"category": category}, sort=[("order", -1)])
        next_order = last.get("order", -1) + 1 if last else 0
        for file in sorted((materiais / category).glob("*.png")):
            seed_key = f"materials-v1:{category}:{file.name}"
            # Keep a separate receipt so deleted seed photos stay deleted on restart.
            if await db.seed_imports.find_one({"_id": seed_key}):
                continue
            existing = await db.media.find_one({"category": category, "filename": file.name})
            if existing is None:
                raw = optimize_image(file.read_bytes())
                result = await db.media.update_one({"_id": seed_key}, {"$setOnInsert": {
                    "id": str(uuid.uuid5(uuid.NAMESPACE_URL, seed_key)),
                    "category": category,
                    "procedure": ESTETICA_SEED.get(file.name) if category == "estetica" else None,
                    "filename": file.name,
                    "content_type": "image/jpeg",
                    "data": base64.b64encode(raw).decode(),
                    "order": next_order,
                    "created_at": datetime.now(timezone.utc).isoformat(),
                }}, upsert=True)
                if result.upserted_id is not None:
                    imported[category] += 1
                    next_order += 1
            await db.seed_imports.update_one({"_id": seed_key}, {"$setOnInsert": {
                "imported_at": datetime.now(timezone.utc).isoformat(),
            }}, upsert=True)
    logger.info("Importacao inicial de midias: %s", imported)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
