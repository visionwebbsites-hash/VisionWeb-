import { WA_LINK } from "../data/site";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FinalCta = () => (
  <section
    data-testid="cta-final-section"
    className="grain relative overflow-hidden bg-[#2C1810] py-24 sm:py-32"
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 120%, rgba(192,108,92,0.4) 0%, rgba(44,24,16,0) 60%)",
      }}
    />
    <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E0A795]">
          Senhorita M · Espaço de Beleza
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          data-testid="cta-final-headline"
          className="mt-6 text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#FDFBF7] sm:text-5xl lg:text-6xl"
        >
          PRONTA PARA <em className="italic text-[#C06C5C]">CUIDAR DE VOCÊ?</em>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#D8BFB6] sm:text-lg">
          Agende seu horário e venha viver sua experiência de beleza na
          Senhorita M.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <a
          data-testid="cta-final-button-whatsapp"
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#FDFBF7] px-10 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#7F3B2E] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-white sm:px-12"
        >
          <WhatsAppIcon size={19} className="text-[#B05B4B]" />
          Agendar pelo WhatsApp
        </a>
      </Reveal>
    </div>
  </section>
);
