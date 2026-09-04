import { Instagram } from "lucide-react";
import { ADDRESS, IG_HANDLE, IG_LINK, IMAGES, NAV_LINKS, WA_DISPLAY, WA_LINK, scrollToSection } from "../data/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const Footer = () => (
  <footer
    data-testid="footer-section"
    className="border-t border-white/10 bg-[#2C1810] pb-10 pt-16 text-[#D8BFB6]"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3.5">
            <img
              src={IMAGES.logo}
              alt="Logo Senhorita M"
              data-testid="footer-logo"
              className="h-12 w-12 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="leading-tight">
              <p className="font-serif text-xl font-semibold italic text-[#FDFBF7]">
                Senhorita M
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C06C5C]">
                Espaço de Beleza
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#B89A90]">
            {ADDRESS.street} — {ADDRESS.district}, {ADDRESS.city}
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E0A795]">
            Navegação
          </p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  data-testid={`footer-${l.testId.replace("nav-", "")}`}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(l.id);
                  }}
                  className="text-sm text-[#D8BFB6] transition-colors hover:text-[#FDFBF7]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E0A795]">
            Contato
          </p>
          <div className="mt-5 space-y-3.5">
            <a
              data-testid="footer-whatsapp-link"
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-[#FDFBF7]"
            >
              <WhatsAppIcon size={15} className="text-[#C06C5C]" />
              {WA_DISPLAY}
            </a>
            <a
              data-testid="footer-instagram-link"
              href={IG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-[#FDFBF7]"
            >
              <Instagram size={15} className="text-[#C06C5C]" strokeWidth={1.8} />
              {IG_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-white/10 pt-7 text-center">
        <p
          data-testid="footer-copyright-text"
          className="text-xs text-[#B89A90]"
        >
          © 2026 Senhorita M Espaço de Beleza. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);
