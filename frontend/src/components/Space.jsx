import { IMAGES } from "../data/site";
import { PhotoSlot } from "./PhotoSlot";
import { Reveal, SectionHeading } from "./Reveal";

export const Space = () => (
  <section
    id="espaco"
    data-testid="nosso-espaco-section"
    className="bg-[#F9F5F0] py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="05"
        eyebrow="Nosso Espaço"
        title="UM AMBIENTE PENSADO PARA VOCÊ"
        sub="Um ambiente acolhedor, elegante e preparado para tornar seu momento de cuidado ainda mais especial."
        testId="espaco-heading"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" delay={0.05}>
          <PhotoSlot
            src={IMAGES.salonFlowers}
            label="Interior do salão"
            ratio="aspect-[3/4]"
            testId="espaco-frame-1"
            alt="Interior do Senhorita M com flores, espelhos arqueados e cadeiras"
            className="h-full rounded-[1.4rem]"
          />
        </Reveal>
        <div className="flex flex-col gap-5 lg:col-span-4 lg:pt-14">
          <Reveal delay={0.15}>
            <PhotoSlot
              src={IMAGES.salonWide}
              label="Visão ampla do salão"
              ratio="aspect-[4/3]"
              testId="espaco-frame-2"
              alt="Visão ampla do interior do Senhorita M Espaço de Beleza"
              className="rounded-[1.4rem]"
            />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="max-w-xs text-sm italic leading-relaxed text-[#827168] lg:pl-2">
              “Cada detalhe do espaço foi pensado para que o seu momento de
              beleza seja também um momento de descanso.”
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-3 lg:pt-28" delay={0.2}>
          <PhotoSlot
            src={IMAGES.nailDisplay}
            label="Expositor de esmaltes"
            ratio="aspect-[3/4]"
            testId="espaco-frame-3"
            alt="Expositor de esmaltes do Senhorita M Espaço de Beleza"
            className="rounded-[1.4rem]"
          />
        </Reveal>
      </div>
    </div>
  </section>
);
