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
  const yCard = useTransform(scrollY, [0, 700], [0, -55]);

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
            className="relative z-10 ml-auto w-[82%] overflow-hidden rounded-[1.6rem] border border-[#ECCEC8] shadow-[0_30px_60px_-25px_rgba(44,24,16,0.28)] sm:w-[74%]"
          >
            <img
              src={IMAGES.salonFlowers}
              alt="Interior do Senhorita M Espaço de Beleza com flores, espelhos e cadeiras"
              className="aspect-[3/4] w-full object-cover"
              loading="eager"
              decoding="async"
              data-testid="hero-main-image"
            />
          </motion.div>
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
            className="absolute -bottom-8 left-0 z-20 w-[46%] overflow-hidden rounded-2xl border-4 border-[#FDFBF7] shadow-[0_24px_45px_-18px_rgba(44,24,16,0.35)] sm:w-[40%]"
          >
            <img
              src={IMAGES.hairWaves}
              alt="Resultado de cabelo longo com ondas feito no Senhorita M"
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
              decoding="async"
              data-testid="hero-secondary-image"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="absolute -right-2 top-6 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#2C1810] text-center shadow-xl sm:-right-4 sm:h-28 sm:w-28"
            data-testid="hero-seal"
          >
            <span className="font-serif text-lg italic leading-none text-[#F0D9D2]">
              Senhorita
            </span>
            <span className="font-serif text-3xl font-semibold leading-none text-[#C06C5C]">
              M
            </span>
            <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.28em] text-[#F0D9D2]/80">
              Florianópolis
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
