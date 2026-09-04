import { Eye, Feather, Hand, Scissors } from "lucide-react";
import { SERVICES, WA_LINK } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

const ICONS = {
  "nail-designer": Hand,
  cabeleireira: Scissors,
  cilios: Eye,
  sobrancelhas: Feather,
};

export const Services = () => (
  <section
    id="servicos"
    data-testid="servicos-section"
    className="bg-[#F9F5F0] py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="02"
        eyebrow="Nossos Serviços"
        title="TUDO PARA REALÇAR A SUA BELEZA"
        sub="Cuidados pensados para valorizar você em cada detalhe."
        testId="servicos-heading"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
        {SERVICES.map((cat, i) => {
          const Icon = ICONS[cat.id];
          return (
            <Reveal key={cat.id} delay={i * 0.08}>
              <article
                data-testid={`servicos-category-${cat.id}`}
                className="group flex h-full flex-col rounded-3xl border border-[#ECCEC8] bg-white p-7 shadow-[0_1px_2px_rgba(44,24,16,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#B05B4B]/50 hover:shadow-[0_20px_40px_-20px_rgba(44,24,16,0.16)] sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF0EE] text-[#B05B4B]">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="font-serif text-4xl font-medium italic text-[#ECCEC8]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium text-[#2C1810] sm:text-3xl">
                  {cat.title}
                </h3>
                <p className="mt-1.5 text-sm italic text-[#B05B4B]">
                  {cat.tagline}
                </p>
                <ul className="mt-6 grid flex-1 grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#4A3B34]"
                    >
                      <span className="mt-0.5 text-[10px] text-[#C06C5C]">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  data-testid={`servicos-cta-${cat.id}`}
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full border border-[#B05B4B]/45 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] transition-[background-color,color,border-color] duration-300 hover:border-[#B05B4B] hover:bg-[#B05B4B] hover:text-white"
                >
                  <WhatsAppIcon size={15} />
                  Agendar pelo WhatsApp
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
