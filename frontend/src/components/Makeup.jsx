import { IMAGES, WA_LINK } from "../data/site";
import { PhotoSlot } from "./PhotoSlot";
import { CtaButton, Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const Makeup = () => (
  <section
    id="maquiagem"
    data-testid="maquiagem-section"
    className="grain relative overflow-hidden bg-[#2C1810] py-20 sm:py-28"
  >
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, rgba(192,108,92,0.28) 0%, rgba(44,24,16,0) 60%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="04"
        eyebrow="Maquiagem"
        title="MAQUIAGEM"
        sub="Uma produção à altura dos seus momentos especiais."
        dark={true}
        testId="maquiagem-heading"
      />

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        <Reveal delay={0.05}>
          <PhotoSlot
            src={IMAGES.makeup1}
            label="Maquiagem Senhorita M"
            ratio="aspect-[3/4]"
            testId="maquiagem-photo-1"
            alt="Maquiagem profissional realizada na Senhorita M Espaço de Beleza"
            className="rounded-[1.4rem] border-white/10 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.55)]"
          />
        </Reveal>
        <Reveal delay={0.15} className="sm:pt-12">
          <PhotoSlot
            src={IMAGES.makeup2}
            label="Maquiagem Senhorita M"
            ratio="aspect-[3/4]"
            testId="maquiagem-photo-2"
            alt="Resultado de maquiagem profissional na Senhorita M Espaço de Beleza"
            className="rounded-[1.4rem] border-white/10 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.55)]"
          />
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 text-center">
          <CtaButton
            href={WA_LINK}
            variant="light"
            testId="maquiagem-cta-whatsapp"
            icon={<WhatsAppIcon size={16} className="text-[#B05B4B]" />}
          >
            Agendar pelo WhatsApp
          </CtaButton>
        </div>
      </Reveal>
    </div>
  </section>
);
