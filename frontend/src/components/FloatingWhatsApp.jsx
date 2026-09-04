import { WA_LINK } from "../data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FloatingWhatsApp = () => (
  <a
    data-testid="whatsapp-floating-button"
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Agende seu horário pelo WhatsApp"
    className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
  >
    <span
      data-testid="whatsapp-floating-tooltip"
      className="rounded-full border border-[#ECCEC8] bg-[#FDFBF7]/95 px-4 py-2 text-xs font-semibold text-[#7F3B2E] shadow-lg backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
    >
      Agende seu horário
    </span>
    <span className="relative flex h-14 w-14 items-center justify-center">
      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#B05B4B]" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#B05B4B] text-white shadow-[0_14px_30px_-8px_rgba(176,91,75,0.65)] transition-[transform,background-color] duration-300 group-hover:-translate-y-1 group-hover:bg-[#984A3B]">
        <WhatsAppIcon size={24} />
      </span>
    </span>
  </a>
);
