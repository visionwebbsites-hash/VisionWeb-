const ITEMS = [
  "Nail Designer",
  "Cabeleireira",
  "Cílios",
  "Sobrancelhas",
  "Santa Mônica · Florianópolis",
];

const Row = ({ hidden }) => (
  <div
    aria-hidden={hidden}
    className="flex shrink-0 items-center"
  >
    {ITEMS.map((item, i) => (
      <span key={`${item}-${i}`} className="flex items-center">
        <span
          className={`whitespace-nowrap px-8 text-2xl sm:text-3xl ${
            i % 2 === 0
              ? "font-serif italic text-[#7F3B2E]"
              : "font-sans text-sm font-semibold uppercase tracking-[0.3em] text-[#B05B4B] sm:text-base"
          }`}
        >
          {item}
        </span>
        <span className="text-lg text-[#C06C5C]/70">✦</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="overflow-hidden border-b border-[#ECCEC8]/80 bg-[#FDFBF7] py-6"
  >
    <div className="animate-marquee flex w-max">
      <Row hidden={false} />
      <Row hidden={true} />
      <Row hidden={true} />
      <Row hidden={true} />
    </div>
  </div>
);
