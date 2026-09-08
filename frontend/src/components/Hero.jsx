import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { IMAGES, WA_LINK, scrollToSection } from "../data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

const EASE = [0.22, 1, 0.36, 1];

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const yMain = useTransform(scrollY, [0, 700], [0, 70]);

  return (
    <section
      id="inicio"
      data-testid="hero-section"
      className="grain relative overflow-hidden pt-[68px]"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(192,108,92,0.13) 0%, rgba(253,251,247,0) 68%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20 lg:px-8">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ECCEC8] bg-white/70 px-4 py-2"
            data-testid="hero-badge-location"
          >
            <MapPin size={13} className="text-[#B05B4B]" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7F3B2E]">
              Santa Mônica • Florianópolis
            </span>
          </motion.div>

          <h1
            data-testid="hero-headline"
            className="font-serif text-[2.9rem] font-medium leading-[1.02] tracking-tight text-[#2C1810] sm:text-6xl lg:text-[4.4rem]"
          >
            <MaskedLine delay={0.25}>BELEZA QUE</MaskedLine>
            <MaskedLine delay={0.37}>VALORIZA A SUA</MaskedLine>
            <MaskedLine delay={0.49}>
              <em className="italic text-[#B05B4B]">ESSÊNCIA</em>
            </MaskedLine>
          </h1>

          <motion.p
            data-testid="hero-subtitle"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-7 max-w-md text-base leading-relaxed text-[#827168] sm:text-lg"
          >
            Um espaço pensado para você se cuidar, se sentir ainda mais bonita e
            viver uma experiência de beleza completa em Florianópolis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <a
              data-testid="hero-primary-cta-whatsapp"
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#B05B4B] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white shadow-[0_14px_30px_-10px_rgba(176,91,75,0.6)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#984A3B]"
            >
              <WhatsAppIcon size={17} />
              Agendar pelo WhatsApp
            </a>
            <a
              data-testid="hero-secondary-cta-servicos"
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("servicos");
              }}
              className="inline-flex items-center justify-center rounded-full border border-[#B05B4B]/45 px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#7F3B2E] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-[#B05B4B] hover:bg-[#FAF0EE]"
            >
              Conhecer nossos serviços
            </a>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            style={{ y: yMain }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="relative z-10 mx-auto w-full max-w-[440px] overflow-hidden rounded-[1.6rem] border border-[#ECCEC8] shadow-[0_30px_60px_-25px_rgba(44,24,16,0.28)] lg:ml-auto lg:mr-0"
          >
            <img
              src={IMAGES.heroBanner}
              alt="Senhorita M Espaço de Beleza — Mais brilho, beleza e confiança. Resultado feito no Senhorita M."
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
              data-testid="hero-main-image"
            />
            <a
              data-testid="hero-banner-cta-whatsapp"
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agende seu horário pelo WhatsApp"
              className="absolute bottom-[1.5%] left-1/2 block h-[8.5%] w-[40%] -translate-x-1/2 cursor-pointer rounded-full transition-colors duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B05B4B]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
