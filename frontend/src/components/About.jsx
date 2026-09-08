import { IMAGES, WA_LINK } from "../data/site";
import { CtaButton, Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const About = () => (
  <section
    id="sobre"
    data-testid="sobre-section"
    className="bg-[#FDFBF7] py-20 sm:py-28"
  >
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
      <div className="lg:col-span-6">
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

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-6">
        <Reveal>
          <img
            src={IMAGES.salonMirrors}
            alt="Interior do Senhorita M Espaço de Beleza com espelhos arqueados iluminados"
            className="aspect-[3/4] w-full rounded-[1.4rem] border border-[#ECCEC8] object-cover shadow-[0_25px_50px_-25px_rgba(44,24,16,0.25)]"
            loading="lazy"
            decoding="async"
            data-testid="sobre-image-salao"
          />
        </Reveal>
        <Reveal delay={0.15} className="pt-10 sm:pt-14">
          <img
            src={IMAGES.hairstyle}
            alt="Penteado com ondas feito na Senhorita M Espaço de Beleza"
            className="aspect-[3/4] w-full rounded-[1.4rem] border border-[#ECCEC8] object-cover shadow-[0_25px_50px_-25px_rgba(44,24,16,0.25)]"
            loading="lazy"
            decoding="async"
            data-testid="sobre-image-penteado"
          />
        </Reveal>
      </div>
    </div>
  </section>
);
