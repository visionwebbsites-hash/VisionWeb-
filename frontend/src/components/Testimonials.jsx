import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, Star } from "lucide-react";
import { REVIEWS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

const Stars = () => (
  <div className="flex gap-1" aria-label="Avaliação: 5 de 5 estrelas">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={15} className="fill-[#B05B4B] text-[#B05B4B]" />
    ))}
  </div>
);

const ReviewCard = ({ review, testId }) => (
  <figure
    data-testid={testId}
    className="flex h-full flex-col gap-5 rounded-3xl border border-[#ECCEC8] bg-white p-7 shadow-[0_1px_2px_rgba(44,24,16,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#B05B4B]/50 hover:shadow-[0_20px_40px_-20px_rgba(44,24,16,0.16)]"
  >
    <div className="flex items-center justify-between">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF0EE] text-[#B05B4B]">
        <Quote size={16} strokeWidth={1.6} />
      </span>
      <Stars />
    </div>
    <blockquote className="flex-1 font-serif text-base italic leading-relaxed text-[#4A3B34]">
      “{review.text}”
    </blockquote>
    <figcaption className="border-t border-[#ECCEC8]/70 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B05B4B]">
      {review.name}
    </figcaption>
  </figure>
);

export const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
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
    <section
      id="depoimentos"
      data-testid="depoimentos-section"
      className="bg-[#F9F5F0] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="07"
          eyebrow="Avaliações"
          title="O QUE NOSSAS CLIENTES DIZEM"
          sub="A experiência de quem já viveu o cuidado e o atendimento da Senhorita M."
          testId="depoimentos-heading"
        />

        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className="h-full">
              <ReviewCard review={r} testId={`depoimentos-card-${i + 1}`} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {REVIEWS.map((r, i) => (
                <div key={r.name} className="min-w-0 flex-[0_0_88%] pr-4 first:pl-0">
                  <ReviewCard review={r} testId={`depoimentos-card-mobile-${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2" data-testid="depoimentos-dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                data-testid={`depoimentos-dot-${i}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir para a avaliação ${i + 1}`}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  selected === i ? "w-6 bg-[#B05B4B]" : "w-2 bg-[#ECCEC8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
