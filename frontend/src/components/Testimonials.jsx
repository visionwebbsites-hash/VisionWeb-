import { useEffect, useState } from "react";
import axios from "axios";
import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/testimonials`)
      .then((res) => setTestimonials(res.data.testimonials || []))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <section
      id="depoimentos"
      data-testid="depoimentos-section"
      className="bg-[#F9F5F0] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="06"
          eyebrow="Depoimentos"
          title="QUEM VIVE A EXPERIÊNCIA, RECOMENDA"
          testId="depoimentos-heading"
        />

        {testimonials.length === 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 0.08}>
                <div
                  data-testid={`depoimentos-card-placeholder-${n}`}
                  className="flex h-full min-h-[210px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-[#C06C5C]/40 bg-white/60 p-8 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF0EE] text-[#B05B4B]">
                    <Quote size={18} strokeWidth={1.6} />
                  </span>
                  <p className="font-serif text-lg italic text-[#7F3B2E]">
                    Espaço reservado para depoimentos reais de clientes
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B05B4B]/70">
                    Em breve
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id || i} delay={i * 0.08}>
                <figure
                  data-testid={`depoimentos-card-${i}`}
                  className="flex h-full flex-col gap-5 rounded-3xl border border-[#ECCEC8] bg-white p-8"
                >
                  <Quote size={22} className="text-[#C06C5C]" strokeWidth={1.4} />
                  <blockquote className="flex-1 font-serif text-lg italic leading-relaxed text-[#4A3B34]">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B05B4B]">
                    {t.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
