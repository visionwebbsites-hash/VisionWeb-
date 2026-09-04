import { IMAGES, WA_LINK } from "../data/site";
import { CtaButton, Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const About = () => (
  <section
    id="sobre"
    data-testid="sobre-section"
    className="bg-[#FDFBF7] py-20 sm:py-28"
  >
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
      <div className="relative lg:col-span-5">
        <Reveal>
          <div className="overflow-hidden rounded-[1.6rem] border border-[#ECCEC8] shadow-[0_25px_50px_-25px_rgba(44,24,16,0.25)]">
            <img
              src={IMAGES.editorial}
              alt="Editorial Senhorita M — cabelo liso e saudável"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
              data-testid="sobre-image"
            />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <img
            src={IMAGES.logo}
            alt="Selo Senhorita M Salão de Beleza"
            className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full border-4 border-[#FDFBF7] object-cover shadow-xl sm:-right-8 sm:h-32 sm:w-32"
            loading="lazy"
            decoding="async"
            data-testid="sobre-logo-seal"
          />
        </Reveal>
      </div>

      <div className="lg:col-span-7 lg:pl-6">
        <SectionHeading
          chapter="01"
          eyebrow="Sobre a Senhorita M"
          title="UM ESPAÇO FEITO PARA VOCÊ"
          align="left"
          testId="sobre-heading"
        />
        <Reveal delay={0.22}>
          <p
            data-testid="sobre-text-1"
            className="mt-7 max-w-xl text-base leading-relaxed text-[#4A3B34] sm:text-lg"
          >
            A Senhorita M Espaço de Beleza nasceu para proporcionar muito mais
            do que serviços de beleza. É um espaço onde cuidado, autoestima e
            bem-estar se encontram.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p
            data-testid="sobre-text-2"
            className="mt-5 max-w-xl text-base leading-relaxed text-[#827168]"
          >
            Com atendimento personalizado, técnicas atualizadas e um ambiente
            acolhedor, nossa equipe trabalha para entregar resultados que
            valorizam a beleza e a personalidade de cada cliente.
          </p>
        </Reveal>
        <Reveal delay={0.38}>
          <div className="mt-9">
            <CtaButton
              href={WA_LINK}
              testId="sobre-cta-whatsapp"
              icon={<WhatsAppIcon size={16} />}
            >
              Quero agendar
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
