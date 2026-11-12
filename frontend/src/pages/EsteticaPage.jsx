import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flower2, MapPin } from "lucide-react";
import { api, API } from "../lib/api";
import { ADDRESS, ESTETICA_PROCEDURES, waMsg } from "../data/site";
import { Seo } from "../components/Seo";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { FinalCta } from "../components/FinalCta";
import { Reveal } from "../components/Reveal";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const BASE = API.replace(/\/api$/, "");

export default function EsteticaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    let disposed = false;
    let retryTimer;
    setLoading(true);
    setLoadError(false);
    const load = async (attempt = 0) => {
      try {
        const res = await api.get("/media?category=estetica", { signal: controller.signal, timeout: 35000 });
        if (disposed) return;
        setItems(res.data.items || []);
        setLoading(false);
      } catch {
        if (disposed) return;
        if (attempt < 2) retryTimer = setTimeout(() => load(attempt + 1), 2000);
        else { setLoadError(true); setLoading(false); }
      }
    };
    load();
    return () => { disposed = true; clearTimeout(retryTimer); controller.abort(); };
  }, [reloadCount]);

  const imgFor = (key) => items.find((m) => m.procedure === key);

  return (
    <div className="bg-[#FDFBF7] text-[#2C1810]">
      <Seo
        title="Estética Corporal em Santa Mônica, Florianópolis | Senhorita M"
        description="Drenagem linfática, massagens modeladora, relaxante e terapêutica, shiatsu e ventosaterapia na Senhorita M, Santa Mônica, Florianópolis. Agende pelo WhatsApp."
        path="/estetica"
      />
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
                Estética Corporal
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                data-testid="estetica-title"
                className="mt-5 text-balance font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl"
              >
                Estética Corporal
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#827168] sm:text-lg">
                Cuidados corporais pensados para o seu bem-estar, em um ambiente
                acolhedor em Santa Mônica, Florianópolis.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#827168]">
                <MapPin size={12} className="text-[#B05B4B]" />
                {ADDRESS.street} — {ADDRESS.district}, Florianópolis
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#F9F5F0] py-16 sm:py-20" data-testid="estetica-procedures-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading && <p role="status" className="mb-8 text-center text-sm text-[#827168]">Carregando fotos. Isso pode levar alguns instantes...</p>}
            {loadError && <div role="alert" className="mb-8 text-center text-sm text-[#7F3B2E]"><p>Não foi possível carregar as fotos agora.</p><button type="button" onClick={() => setReloadCount((value) => value + 1)} className="mt-3 rounded-full border border-[#ECCEC8] bg-white px-5 py-2 font-semibold">Tentar novamente</button></div>}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ESTETICA_PROCEDURES.map((p, i) => {
                const media = imgFor(p.key);
                const link = waMsg(
                  `Olá! Gostaria de informações sobre ${p.name} na Senhorita M. 😊`
                );
                return (
                  <Reveal key={p.key} delay={i * 0.06} className="h-full">
                    <article
                      data-testid={`estetica-card-${p.key}`}
                      className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#ECCEC8] bg-white shadow-[0_1px_2px_rgba(44,24,16,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(44,24,16,0.16)]"
                    >
                      {media ? (
                        <img
                          src={`${BASE}${media.url}`}
                          alt={`Imagem ilustrativa de ${p.name}`}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#FAF0EE] to-[#EFE7DF]">
                          <Flower2 size={22} className="text-[#B05B4B]" strokeWidth={1.5} />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B05B4B]/80">
                            {loading ? "Carregando imagem..." : loadError ? "Imagem indisponível no momento" : "Imagem em breve"}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <h2 className="font-serif text-2xl font-medium text-[#2C1810]">
                          {p.name}
                        </h2>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4A3B34]">
                          {p.desc}
                        </p>
                        <p className="mt-3 text-xs italic text-[#B05B4B]">{p.benefit}</p>
                        <a
                          data-testid={`estetica-cta-${p.key}`}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#B05B4B]/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] transition-colors duration-300 hover:border-[#B05B4B] hover:bg-[#B05B4B] hover:text-white"
                        >
                          <WhatsAppIcon size={14} />
                          Agendar pelo WhatsApp
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-10 text-center text-xs text-[#827168]">
              Imagens ilustrativas. Atendimentos de estética e bem-estar, sem finalidade médica.
            </p>
          </div>
        </section>

        <section className="border-t border-[#ECCEC8] bg-[#FDFBF7] py-14">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-4">
            <Link
              data-testid="estetica-link-cabelos"
              to="/cabelos"
              className="rounded-full border border-[#B05B4B]/45 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] transition-colors duration-300 hover:border-[#B05B4B] hover:bg-[#FAF0EE]"
            >
              Cabelos
            </Link>
            <Link
              data-testid="estetica-link-manicure"
              to="/manicure"
              className="rounded-full border border-[#B05B4B]/45 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] transition-colors duration-300 hover:border-[#B05B4B] hover:bg-[#FAF0EE]"
            >
              Manicure
            </Link>
            <Link
              data-testid="estetica-link-inicio"
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
    </div>
  );
}
