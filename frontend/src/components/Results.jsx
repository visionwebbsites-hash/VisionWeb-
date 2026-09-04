import { MoveRight } from "lucide-react";
import { IMAGES, WA_LINK } from "../data/site";
import { PhotoSlot } from "./PhotoSlot";
import { CtaButton, Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

const GALLERY = [
  { src: IMAGES.hairWaves, label: "Cabelo longo com ondas", testId: "resultados-gallery-ondas" },
  { src: IMAGES.nailsRed, label: "Unhas vermelhas", testId: "resultados-gallery-unhas-vermelhas" },
  { src: IMAGES.hairMechas, label: "Cabelo com mechas", testId: "resultados-gallery-mechas" },
  { src: IMAGES.hairBlondeWaves, label: "Cabelo loiro com ondas", testId: "resultados-gallery-loiro-ondas" },
  { src: IMAGES.nailsLight, label: "Unhas claras", testId: "resultados-gallery-unhas-claras" },
  { src: IMAGES.hairBlonde, label: "Resultado loiro", testId: "resultados-gallery-loiro" },
];

export const Results = () => (
  <section
    id="resultados"
    data-testid="resultados-section"
    className="bg-[#FDFBF7] py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="03"
        eyebrow="Antes & Depois"
        title="RESULTADOS QUE FALAM POR SI"
        sub="Confira alguns dos trabalhos realizados pela nossa equipe."
        testId="resultados-heading"
      />

      <Reveal delay={0.15}>
        <div
          data-testid="antes-depois-comparison"
          className="relative mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:gap-5"
        >
          <div className="relative">
            <PhotoSlot
              src={IMAGES.hairBefore}
              label="Antes"
              ratio="aspect-[3/4]"
              testId="antes-photo"
              alt="Cabelo antes do procedimento na Senhorita M"
              className="rounded-2xl"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[#2C1810]/85 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FDFBF7] backdrop-blur-sm">
              Antes
            </span>
          </div>
          <div className="relative">
            <PhotoSlot
              src={IMAGES.hairAfter}
              label="Depois"
              ratio="aspect-[3/4]"
              testId="depois-photo"
              alt="Cabelo depois do procedimento na Senhorita M"
              className="rounded-2xl"
            />
            <span className="absolute left-3 top-3 rounded-full bg-[#B05B4B] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
              Depois
            </span>
          </div>
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#ECCEC8] bg-[#FDFBF7] text-[#B05B4B] shadow-lg">
            <MoveRight size={18} strokeWidth={1.8} />
          </span>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {GALLERY.map((g, i) => (
          <Reveal key={g.testId} delay={i * 0.07}>
            <PhotoSlot
              src={g.src}
              label={g.label}
              tag="Senhorita M"
              ratio="aspect-[3/4]"
              testId={g.testId}
              alt={`${g.label} — resultado da Senhorita M Espaço de Beleza`}
              className="rounded-2xl"
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-12 text-center">
          <CtaButton
            href={WA_LINK}
            testId="resultados-cta-whatsapp"
            icon={<WhatsAppIcon size={16} />}
          >
            Agendar pelo WhatsApp
          </CtaButton>
        </div>
      </Reveal>
    </div>
  </section>
);
