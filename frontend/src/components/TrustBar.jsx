import { Award, Flower2, HeartHandshake, Sparkles } from "lucide-react";
import { TRUST_ITEMS } from "../data/site";
import { Reveal } from "./Reveal";

const ICONS = [HeartHandshake, Award, Flower2, Sparkles];

export const TrustBar = () => (
  <section
    data-testid="trust-bar-section"
    className="border-y border-[#ECCEC8]/80 bg-[#F9F5F0]"
  >
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
      {TRUST_ITEMS.map((item, i) => {
        const Icon = ICONS[i];
        return (
          <Reveal key={item} delay={i * 0.08} y={20}>
            <div
              data-testid={`trust-item-${i}`}
              className="flex items-center gap-3.5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B05B4B]/25 bg-white text-[#B05B4B]">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <p className="text-sm font-medium leading-snug text-[#4A3B34]">
                {item}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);
