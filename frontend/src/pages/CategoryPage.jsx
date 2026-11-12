import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { api, API } from "../lib/api";
import { ADDRESS, SERVICES, waMsg } from "../data/site";
import { Seo } from "../components/Seo";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { FinalCta } from "../components/FinalCta";
import { Reveal } from "../components/Reveal";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const BASE = API.replace(/\/api$/, "");

const CATEGORY_PAGES = [
  { path: "/cabelos", label: "Cabelos" },
  { path: "/manicure", label: "Manicure" },
  { path: "/sobrancelhas", label: "Sobrancelhas" },
  { path: "/maquiagem", label: "Maquiagem" },
  { path: "/cilios", label: "Cílios" },
  { path: "/estetica", label: "Estética Corporal" },
];

const isIllustrative = (media) => (media?.filename || "").startsWith("ilustrativa-ia-");
const photoAlt = (media, index, title) => isIllustrative(media)
  ? `${title} — imagem ilustrativa gerada por IA`
  : `${title} — trabalho ${index + 1} realizado na Senhorita M, Santa Mônica, Florianópolis`;

const ytId = (url) => {
  const m = url?.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : null;
};

export default function CategoryPage({ category, serviceId, path, title, seoTitle, seoDesc, intro }) {
  const [items, setItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);


  const service = SERVICES.find((s) => s.id === serviceId);
  const bookLink = waMsg(
    `Olá! Vi a página de ${service?.title || title} da Senhorita M e gostaria de agendar um horário. 😊`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    let disposed = false;
    let retryTimer;
    setItems([]);
    setVideos([]);
    setLightbox(null);
    setLoading(true);
    setLoadError(false);
    const load = async (attempt = 0) => {
      try {
        const res = await api.get(`/media?category=${category}`, { signal: controller.signal, timeout: 35000 });
        if (disposed) return;
        setItems(res.data.items || []);
        setLoading(false);
      } catch {
        if (disposed) return;
        if (attempt < 2) {
          retryTimer = setTimeout(() => load(attempt + 1), 2000);
        } else {
          setLoadError(true);
          setLoading(false);
        }
      }
    };
    load();
    api.get(`/videos?category=${category}`, { signal: controller.signal }).then((res) => { if (!disposed) setVideos(res.data.items || []); }).catch(() => {});
    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      controller.abort();
    };
  }, [category, reloadCount]);

  return (
    <div className="bg-[#FDFBF7] text-[#2C1810]">
      <Seo title={seoTitle} description={seoDesc} path={path} />
      <Header />
      <main>
        <section
          className="grain relative overflow-hidden pt-[68px]"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(192,108,92,0.13) 0%, rgba(253,251,247,0) 68%)",
          }}
        >
          <div className="mx-auto max-w-3xl px-4 pb-16 pt-14 text-center sm:px-6 lg:pt-20">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B05B4B]">
                <Link to="/" className="transition-colors hover:text-[#7F3B2E]" data-testid="breadcrumb-home">
                  Início
                </Link>
                {" / "}
                {title}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                data-testid="category-title"
                className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl"
              >
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#827168] sm:text-lg">
                {intro}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  data-testid="category-cta-whatsapp"
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#B05B4B] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white shadow-[0_14px_30px_-10px_rgba(176,91,75,0.6)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#984A3B]"
                >
                  <WhatsAppIcon size={17} />
                  Agendar pelo WhatsApp
                </a>
                <p className="flex items-center gap-1.5 text-xs text-[#827168]">
                  <MapPin size={12} className="text-[#B05B4B]" />
                  {ADDRESS.street} — {ADDRESS.district}, Florianópolis
                </p>
              </div>
            </Reveal>
            {service && (
              <Reveal delay={0.3}>
                <ul className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#ECCEC8] bg-white px-4 py-1.5 text-xs font-medium text-[#4A3B34]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>

        <section className="bg-[#F9F5F0] py-16 sm:py-20" data-testid="category-gallery-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-medium text-[#2C1810] sm:text-4xl">
                {category === "cilios" ? "Galeria de cílios" : "Trabalhos realizados"}
              </h2>
            </Reveal>
            {loading && <p role="status" className="mt-8 text-center text-sm text-[#827168]">Carregando fotos. Isso pode levar alguns instantes...</p>}
            {loadError && (
              <div role="alert" className="mt-8 text-center text-sm text-[#7F3B2E]">
                <p>Não foi possível carregar as fotos agora.</p>
                <button type="button" onClick={() => setReloadCount((value) => value + 1)} className="mt-3 rounded-full border border-[#ECCEC8] bg-white px-5 py-2 font-semibold">Tentar novamente</button>
              </div>
            )}
            {!loading && !loadError && items.length === 0 && <p className="mt-8 text-center text-sm text-[#827168]">Nenhuma foto disponível nesta galeria.</p>}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
              {items.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.05}>
                  <button
                    data-testid={`category-gallery-item-${i}`}
                    onClick={() => setLightbox(i)}
                    className="group block w-full overflow-hidden rounded-2xl border border-[#ECCEC8]"
                    aria-label={`Ampliar foto ${i + 1} de ${title}`}
                  >
                    <img
                      src={`${BASE}${m.url}${m.updated_at ? `?v=${encodeURIComponent(m.updated_at)}` : ""}`}
                      alt={photoAlt(m, i, title)}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  {isIllustrative(m) && <p className="mt-2 text-xs leading-relaxed text-[#827168]">Imagem ilustrativa gerada por IA. Não representa um trabalho do salão.</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {videos.length > 0 && (
          <section className="bg-[#FDFBF7] py-16" data-testid="category-videos-section">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center font-serif text-3xl font-medium text-[#2C1810]">
                Vídeos
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {videos.map((v) =>
                  ytId(v.url) ? (
                    <div key={v.id} className="overflow-hidden rounded-2xl border border-[#ECCEC8]">
                      <iframe
                        title={v.title || `Vídeo ${title}`}
                        src={`https://www.youtube.com/embed/${ytId(v.url)}`}
                        className="aspect-video w-full"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[#ECCEC8] bg-[#FDFBF7] py-14">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-4">
            {CATEGORY_PAGES.filter((page) => page.path !== path).map((p) => (
              <Link
                key={p.path}
                data-testid={`category-link-${p.label.toLowerCase().replace(/\s/g, "-")}`}
                to={p.path}
                className="rounded-full border border-[#B05B4B]/45 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] transition-colors duration-300 hover:border-[#B05B4B] hover:bg-[#FAF0EE]"
              >
                {p.label}
              </Link>
            ))}
            <Link
              data-testid="category-link-inicio"
              to="/"
              className="rounded-full border border-[#ECCEC8] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#827168] transition-colors duration-300 hover:bg-[#F9F5F0]"
            >
              Página inicial
            </Link>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />

      {lightbox !== null && items[lightbox] && (
        <div
          data-testid="gallery-lightbox"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2C1810]/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            data-testid="lightbox-close"
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          {lightbox > 0 && (
            <button
              data-testid="lightbox-prev"
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <img
            src={`${BASE}${items[lightbox].url}`}
            alt={photoAlt(items[lightbox], lightbox, title)}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox < items.length - 1 && (
            <button
              data-testid="lightbox-next"
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
