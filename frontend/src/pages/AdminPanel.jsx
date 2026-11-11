import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUp, ImagePlus, LogOut, Trash2, Video } from "lucide-react";
import { api, API, formatApiError } from "../lib/api";
import { ESTETICA_PROCEDURES, IMAGES } from "../data/site";

const BASE = API.replace(/\/api$/, "");
const CATEGORIES = [
  { id: "cabelos", label: "Cabelos" },
  { id: "manicure", label: "Manicure" },
  { id: "estetica", label: "Estética" },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("galeria");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get("/admin/me")
      .then(() => setReady(true))
      .catch(() => {
        localStorage.removeItem("sm_admin_token");
        navigate("/admin/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("sm_admin_token");
    navigate("/admin/login");
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9F5F0] text-sm text-[#827168]">
        Verificando acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0]">
      <Helmet>
        <title>Painel | Senhorita M</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b border-[#ECCEC8] bg-[#FDFBF7]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={IMAGES.logo} alt="Logo" className="h-10 w-10 rounded-full border border-[#ECCEC8] object-cover" />
            <div className="leading-tight">
              <p className="font-serif text-lg font-semibold italic text-[#2C1810]">Painel Senhorita M</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#B05B4B]">Administração do site</p>
            </div>
          </div>
          <button
            data-testid="admin-logout"
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-[#ECCEC8] px-4 py-2 text-xs font-semibold text-[#7F3B2E] transition-colors hover:bg-[#FAF0EE]"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 px-4 pb-3 sm:px-6">
          {[
            { id: "galeria", label: "Galerias" },
            { id: "banners", label: "Banners" },
            { id: "videos", label: "Vídeos" },
          ].map((t) => (
            <button
              key={t.id}
              data-testid={`admin-tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                tab === t.id ? "bg-[#B05B4B] text-white" : "border border-[#ECCEC8] text-[#7F3B2E] hover:bg-[#FAF0EE]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {tab === "galeria" && <GalleryTab />}
        {tab === "banners" && <BannersTab />}
        {tab === "videos" && <VideosTab />}
      </main>
    </div>
  );
}

function GalleryTab() {
  const [cat, setCat] = useState("cabelos");
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [procedure, setProcedure] = useState(ESTETICA_PROCEDURES[0].key);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api.get(`/media?category=${cat}`).then((res) => setItems(res.data.items || [])).catch(() => {});
  }, [cat]);

  useEffect(load, [load]);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", cat);
      if (cat === "estetica") fd.append("procedure", procedure);
      await api.post("/admin/media", fd);
      setFile(null);
      e.target.reset();
      setMsg("Foto enviada com sucesso.");
      load();
    } catch (err) {
      setMsg(formatApiError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const move = async (i, dir) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setItems(arr);
    await api.put("/admin/media/order", { ordered_ids: arr.map((m) => m.id) }).catch(() => {});
  };

  const del = async (id) => {
    if (!window.confirm("Excluir esta foto definitivamente?")) return;
    await api.delete(`/admin/media/${id}`).catch(() => {});
    load();
  };

  const usedProcedures = items.map((m) => m.procedure).filter(Boolean);

  return (
    <div data-testid="admin-galeria">
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            data-testid={`admin-galeria-cat-${c.id}`}
            onClick={() => setCat(c.id)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
              cat === c.id ? "bg-[#2C1810] text-white" : "border border-[#ECCEC8] bg-white text-[#7F3B2E]"
            }`}
          >
            {c.label}
          </button>
        ))}
        <a
          href={`/${cat}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-semibold text-[#B05B4B] underline underline-offset-4"
          data-testid="admin-galeria-preview-link"
        >
          Ver página pública
        </a>
      </div>

      <form onSubmit={upload} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-[#ECCEC8] bg-white p-5">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Nova foto
          <input
            data-testid="admin-upload-input"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 block w-full max-w-xs text-xs text-[#4A3B34]"
          />
        </label>
        {cat === "estetica" && (
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
            Procedimento
            <select
              data-testid="admin-upload-procedure"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className="mt-2 block rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2 text-xs normal-case tracking-normal"
            >
              {ESTETICA_PROCEDURES.map((p) => (
                <option key={p.key} value={p.key} disabled={usedProcedures.includes(p.key)}>
                  {p.name}
                  {usedProcedures.includes(p.key) ? " (já possui imagem)" : ""}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          data-testid="admin-upload-submit"
          disabled={busy || !file}
          className="flex items-center gap-2 rounded-full bg-[#B05B4B] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#984A3B] disabled:opacity-50"
        >
          <ImagePlus size={14} /> {busy ? "Enviando..." : "Enviar foto"}
        </button>
        {msg && <p data-testid="admin-upload-msg" className="w-full text-xs text-[#7F3B2E]">{msg}</p>}
      </form>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((m, i) => (
          <div key={m.id} className="overflow-hidden rounded-2xl border border-[#ECCEC8] bg-white" data-testid={`admin-media-${m.id}`}>
            <img src={`${BASE}${m.url}`} alt={m.filename || "Foto da galeria"} className="aspect-[3/4] w-full object-cover" loading="lazy" />
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex gap-1">
                <button data-testid={`admin-media-up-${i}`} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Mover para cima" className="rounded-full border border-[#ECCEC8] p-1.5 text-[#7F3B2E] disabled:opacity-30">
                  <ArrowUp size={13} />
                </button>
                <button data-testid={`admin-media-down-${i}`} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Mover para baixo" className="rounded-full border border-[#ECCEC8] p-1.5 text-[#7F3B2E] disabled:opacity-30">
                  <ArrowDown size={13} />
                </button>
              </div>
              <button data-testid={`admin-media-del-${i}`} onClick={() => del(m.id)} aria-label="Excluir foto" className="rounded-full border border-[#ECCEC8] p-1.5 text-[#984A3B] hover:bg-[#FAF0EE]">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-[#C06C5C]/40 bg-white/60 p-8 text-center text-sm text-[#827168]">
            Nenhuma foto nesta galeria ainda.
          </p>
        )}
      </div>
    </div>
  );
}

function BannersTab() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(() => {
    api.get("/admin/banners").then((res) => setItems(res.data.items || [])).catch(() => {});
  }, []);

  useEffect(load, [load]);

  const create = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const form = e.target;
    try {
      const fd = new FormData();
      fd.append("title", form.title.value);
      if (form.description.value) fd.append("description", form.description.value);
      if (form.cta_label.value) fd.append("cta_label", form.cta_label.value);
      if (form.link.value) fd.append("link", form.link.value);
      if (form.image.files?.[0]) fd.append("file", form.image.files[0]);
      await api.post("/admin/banners", fd);
      form.reset();
      setMsg("Banner criado. Ative-o para exibir no site.");
      load();
    } catch (err) {
      setMsg(formatApiError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const edit = async (e, banner) => {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setMsg("");
    try {
      await api.put(`/admin/banners/${banner.id}`, {
        title: form.elements.title.value,
        description: form.elements.description.value,
        cta_label: form.elements.cta_label.value,
        link: form.elements.link.value,
      });
      setMsg("Banner atualizado.");
      load();
    } catch (err) {
      setMsg(formatApiError(err.response?.data?.detail) || "Não foi possível atualizar o banner.");
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (b) => {
    await api.put(`/admin/banners/${b.id}`, { active: !b.active }).catch(() => {});
    load();
  };

  const del = async (id) => {
    if (!window.confirm("Excluir este banner?")) return;
    await api.delete(`/admin/banners/${id}`).catch(() => {});
    load();
  };

  return (
    <div data-testid="admin-banners">
      <form onSubmit={create} className="grid gap-3 rounded-2xl border border-[#ECCEC8] bg-white p-5 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Título *
          <input data-testid="banner-title" name="title" required className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Imagem (opcional)
          <input data-testid="banner-image" name="image" type="file" accept="image/*" className="mt-2 block w-full text-xs" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] sm:col-span-2">
          Descrição (opcional)
          <input data-testid="banner-description" name="description" className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Texto do botão (opcional)
          <input data-testid="banner-cta" name="cta_label" placeholder="Ex.: Agendar" className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Link do botão (opcional)
          <input data-testid="banner-link" name="link" placeholder="https://..." className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <p className="text-xs text-[#827168] sm:col-span-2">
          Posição: topo da página inicial (abaixo do cabeçalho).
        </p>
        <div className="sm:col-span-2">
          <button
            data-testid="banner-submit"
            disabled={busy}
            className="rounded-full bg-[#B05B4B] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#984A3B] disabled:opacity-50"
          >
            {busy ? "Salvando..." : "Criar banner"}
          </button>
          {msg && <span data-testid="banner-msg" className="ml-3 text-xs text-[#7F3B2E]">{msg}</span>}
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {items.map((b) => (
          <div key={b.id} data-testid={`admin-banner-${b.id}`} className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#ECCEC8] bg-white p-4">
            {b.image_url && (
              <img src={`${BASE}${b.image_url}`} alt={b.title} className="h-12 w-12 rounded-full border border-[#ECCEC8] object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg italic text-[#2C1810]">{b.title}</p>
              {b.description && <p className="truncate text-xs text-[#827168]">{b.description}</p>}
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${b.active ? "bg-[#B05B4B] text-white" : "bg-[#EFE7DF] text-[#827168]"}`}>
              {b.active ? "Ativo" : "Inativo"}
            </span>
            <button
              data-testid={`admin-banner-toggle-${b.id}`}
              onClick={() => toggle(b)}
              className="rounded-full border border-[#B05B4B]/45 px-4 py-1.5 text-xs font-semibold text-[#7F3B2E] transition-colors hover:bg-[#FAF0EE]"
            >
              {b.active ? "Desativar" : "Ativar"}
            </button>
            <button data-testid={`admin-banner-del-${b.id}`} onClick={() => del(b.id)} aria-label="Excluir banner" className="rounded-full border border-[#ECCEC8] p-2 text-[#984A3B] hover:bg-[#FAF0EE]">
              <Trash2 size={14} />
            </button>
            <details className="w-full border-t border-[#ECCEC8] pt-3">
              <summary className="cursor-pointer text-xs font-semibold text-[#7F3B2E]">Editar banner</summary>
              <form onSubmit={(e) => edit(e, b)} className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ["title", "Título do banner", b.title],
                  ["description", "Descrição do banner", b.description],
                  ["cta_label", "Texto do botão do banner", b.cta_label],
                  ["link", "Link do botão do banner", b.link],
                ].map(([name, label, value]) => (
                  <label key={name} className="text-xs text-[#7F3B2E]">
                    {label}
                    <input name={name} defaultValue={value || ""} required={name === "title"} className="mt-1 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2 text-sm" />
                  </label>
                ))}
                <button disabled={busy} className="rounded-full bg-[#B05B4B] px-5 py-2 text-xs font-semibold text-white disabled:opacity-50">Salvar alterações</button>
              </form>
            </details>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#C06C5C]/40 bg-white/60 p-8 text-center text-sm text-[#827168]">
            Nenhum banner criado ainda.
          </p>
        )}
      </div>
    </div>
  );
}

function VideosTab() {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("cabelos");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  const load = useCallback(() => {
    api.get("/videos").then((res) => setItems(res.data.items || [])).catch(() => {});
  }, []);

  useEffect(load, [load]);

  const create = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/admin/videos", { category: cat, url, title: title || null });
      setUrl("");
      setTitle("");
      setMsg("Vídeo cadastrado.");
      load();
    } catch (err) {
      setMsg(formatApiError(err.response?.data?.detail));
    }
  };

  const del = async (id) => {
    if (!window.confirm("Remover este vídeo?")) return;
    await api.delete(`/admin/videos/${id}`).catch(() => {});
    load();
  };

  return (
    <div data-testid="admin-videos">
      <form onSubmit={create} className="flex flex-wrap items-end gap-3 rounded-2xl border border-[#ECCEC8] bg-white p-5">
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Categoria
          <select data-testid="video-category" value={cat} onChange={(e) => setCat(e.target.value)} className="mt-2 block rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-xs normal-case tracking-normal">
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="min-w-56 flex-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Link do vídeo (YouTube) *
          <input data-testid="video-url" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E]">
          Título (opcional)
          <input data-testid="video-title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-3 py-2.5 text-sm normal-case tracking-normal" />
        </label>
        <button data-testid="video-submit" className="flex items-center gap-2 rounded-full bg-[#B05B4B] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#984A3B]">
          <Video size={14} /> Cadastrar
        </button>
        {msg && <p data-testid="video-msg" className="w-full text-xs text-[#7F3B2E]">{msg}</p>}
      </form>

      <div className="mt-6 space-y-3">
        {items.map((v) => (
          <div key={v.id} data-testid={`admin-video-${v.id}`} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#ECCEC8] bg-white p-4">
            <span className="rounded-full bg-[#FAF0EE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B05B4B]">
              {CATEGORIES.find((c) => c.id === v.category)?.label || v.category}
            </span>
            <a href={v.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm text-[#4A3B34] underline underline-offset-4">
              {v.title || v.url}
            </a>
            <button data-testid={`admin-video-del-${v.id}`} onClick={() => del(v.id)} aria-label="Remover vídeo" className="rounded-full border border-[#ECCEC8] p-2 text-[#984A3B] hover:bg-[#FAF0EE]">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#C06C5C]/40 bg-white/60 p-8 text-center text-sm text-[#827168]">
            Nenhum vídeo cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
