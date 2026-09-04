import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { BEFORE_AFTER } from "../data/site";
import { PhotoSlot } from "./PhotoSlot";

const PairSlide = ({ pair, category, testId }) => (
  <div
    data-testid={testId}
    className="relative mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-5"
  >
    <div className="relative">
      <PhotoSlot
        src={pair?.before}
        label="Antes"
        tag="Foto real em breve"
        ratio="aspect-[3/4]"
        testId={`${testId}-antes`}
        alt={`Antes — ${category} na Senhorita M`}
        className="rounded-2xl"
      />
      <span className="absolute left-3 top-3 rounded-full bg-[#2C1810]/85 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FDFBF7] backdrop-blur-sm">
        Antes
      </span>
    </div>
    <div className="relative">
      <PhotoSlot
        src={pair?.after}
        label="Depois"
        tag="Foto real em breve"
        ratio="aspect-[3/4]"
        testId={`${testId}-depois`}
        alt={`Depois — ${category} na Senhorita M`}
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
);

export const BeforeAfter = () => {
  const [cat, setCat] = useState(BEFORE_AFTER[0].id);
  const active = BEFORE_AFTER.find((c) => c.id === cat);
  const slides = active.pairs.length > 0 ? active.pairs : [null];
  const multiple = slides.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: multiple });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div data-testid="antes-depois-carousel">
      <div
        data-testid="antes-depois-tabs"
        className="mb-9 flex flex-wrap justify-center gap-2.5"
      >
        {BEFORE_AFTER.map((c) => (
          <button
            key={c.id}
            data-testid={`antes-depois-tab-${c.id}`}
            onClick={() => {
              setCat(c.id);
              setSelected(0);
            }}
            className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-[background-color,color,border-color] duration-300 ${
              cat === c.id
                ? "bg-[#B05B4B] text-white shadow-[0_8px_18px_-8px_rgba(176,91,75,0.6)]"
                : "border border-[#B05B4B]/40 text-[#7F3B2E] hover:border-[#B05B4B] hover:bg-[#FAF0EE]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div key={cat} className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((pair, i) => (
            <div
              key={`${cat}-${i}`}
              className="min-w-0 flex-[0_0_100%] px-1"
            >
              <PairSlide
                pair={pair}
                category={active.label}
                testId={`antes-depois-${cat}-${i}`}
              />
            </div>
          ))}
        </div>
      </div>

      {multiple && (
        <div className="mt-7 flex items-center justify-center gap-5">
          <button
            data-testid="antes-depois-prev"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Foto anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B05B4B]/40 text-[#7F3B2E] transition-[background-color,color,border-color] duration-300 hover:border-[#B05B4B] hover:bg-[#B05B4B] hover:text-white"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <div className="flex items-center gap-2" data-testid="antes-depois-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                data-testid={`antes-depois-dot-${i}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir para o par ${i + 1}`}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  selected === i ? "w-6 bg-[#B05B4B]" : "w-2 bg-[#ECCEC8]"
                }`}
              />
            ))}
          </div>
          <button
            data-testid="antes-depois-next"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Próxima foto"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B05B4B]/40 text-[#7F3B2E] transition-[background-color,color,border-color] duration-300 hover:border-[#B05B4B] hover:bg-[#B05B4B] hover:text-white"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </div>
  );
};
