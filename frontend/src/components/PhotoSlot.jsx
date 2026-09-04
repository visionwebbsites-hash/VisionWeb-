import { Flower2 } from "lucide-react";

export const PhotoSlot = ({
  label,
  tag = "Em breve",
  ratio = "aspect-[4/5]",
  src,
  alt,
  className = "",
  testId,
  eager = false,
}) => (
  <figure
    data-testid={testId}
    className={`group relative overflow-hidden rounded-xl border border-[#ECCEC8] bg-gradient-to-br from-[#FAF0EE] to-[#EFE7DF] shadow-[0_1px_2px_rgba(44,24,16,0.04)] ${ratio} ${className}`}
  >
    {src ? (
      <img
        src={src}
        alt={alt || label}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B05B4B]/30 bg-white/60 text-[#B05B4B]">
          <Flower2 size={20} strokeWidth={1.5} />
        </span>
        <figcaption className="font-serif text-lg italic leading-snug text-[#7F3B2E]">
          {label}
        </figcaption>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B05B4B]/80">
          {tag}
        </span>
      </div>
    )}
  </figure>
);
