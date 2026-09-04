import { IMAGES, WA_LINK } from "../data/site";
import { BeforeAfter } from "./BeforeAfter";
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
        <div data-testid="antes-depois-comparison" className="mt-14">
          <BeforeAfter />
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
