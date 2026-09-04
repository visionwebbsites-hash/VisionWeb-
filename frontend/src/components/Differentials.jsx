import { Flower2, Gem, HeartHandshake, Sparkles } from "lucide-react";
import { DIFFERENTIALS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

const ICONS = [HeartHandshake, Gem, Sparkles, Flower2];

export const Differentials = () => (
  <section
    id="diferenciais"
    data-testid="diferenciais-section"
    className="bg-[#FDFBF7] py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="06"
        eyebrow="Por que a Senhorita M"
        title="CUIDADO EM CADA DETALHE"
        testId="diferenciais-heading"
      />
      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {DIFFERENTIALS.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={item} delay={i * 0.08}>
              <div
                data-testid={`diferencial-item-${i}`}
                className="group border-t border-[#ECCEC8] pt-7 transition-colors duration-300 hover:border-[#B05B4B]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF0EE] text-[#B05B4B] transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-lg italic text-[#C06C5C]/70">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium leading-snug text-[#2C1810] sm:text-2xl">
                  {item}
                </h3>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
