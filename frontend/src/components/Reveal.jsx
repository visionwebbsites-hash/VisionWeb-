import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({
  children,
  delay = 0,
  y = 32,
  className = "",
  ...rest
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({
  chapter,
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
  testId,
}) => {
  const alignCls =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div className={`flex flex-col gap-5 ${alignCls}`} data-testid={testId}>
      <Reveal>
        <p
          className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${
            dark ? "text-[#E0A795]" : "text-[#B05B4B]"
          }`}
        >
          <span className="font-serif text-base italic tracking-normal">
            {chapter}
          </span>
          <span
            className={`h-px w-8 ${dark ? "bg-[#E0A795]/50" : "bg-[#B05B4B]/40"}`}
          />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`max-w-3xl text-balance font-serif text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? "text-[#FDFBF7]" : "text-[#2C1810]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.18}>
          <p
            className={`max-w-xl text-base leading-relaxed sm:text-lg ${
              dark ? "text-[#D8BFB6]" : "text-[#827168]"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export const CtaButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  testId,
  icon,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-[transform,box-shadow,background-color,color,border-color] duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B05B4B]";
  const styles = {
    primary:
      "bg-[#B05B4B] text-white shadow-[0_10px_25px_-8px_rgba(176,91,75,0.55)] hover:bg-[#984A3B] hover:shadow-[0_16px_32px_-10px_rgba(152,74,59,0.6)]",
    outline:
      "border border-[#B05B4B]/45 bg-transparent text-[#7F3B2E] hover:border-[#B05B4B] hover:bg-[#FAF0EE]",
    ghostDark:
      "border border-[#FDFBF7]/35 bg-transparent text-[#FDFBF7] hover:bg-[#FDFBF7]/10",
    light:
      "bg-[#FDFBF7] text-[#7F3B2E] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)] hover:bg-white",
  };
  return (
    <a
      data-testid={testId}
      href={href}
      onClick={onClick}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
};
