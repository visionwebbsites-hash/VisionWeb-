import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { IMAGES, NAV_LINKS, scrollToSection } from "../data/site";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
    <header
      data-testid="nav-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-[#ECCEC8]/70 bg-[#FDFBF7]/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          data-testid="nav-logo-link"
          href="#inicio"
          onClick={(e) => go(e, "inicio")}
          className="flex items-center gap-3"
        >
          <img
            src={IMAGES.logo}
            alt="Logo Senhorita M Espaço de Beleza"
            className="h-11 w-11 rounded-full border border-[#ECCEC8] object-cover"
          />
          <span className="leading-none">
            <span className="block font-serif text-xl font-semibold italic tracking-tight text-[#2C1810]">
              Senhorita M
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.34em] text-[#B05B4B]">
              Espaço de Beleza
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              data-testid={l.testId}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="text-sm font-medium text-[#4A3B34] transition-colors duration-300 hover:text-[#B05B4B]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            data-testid="mobile-menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ECCEC8] text-[#2C1810] lg:hidden"
          >
            <Menu size={19} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#FDFBF7] lg:hidden"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#ECCEC8]/70 px-4">
              <span className="font-serif text-xl font-semibold italic text-[#2C1810]">
                Senhorita M
              </span>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ECCEC8] text-[#2C1810]"
              >
                <X size={19} strokeWidth={1.8} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Menu móvel">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  data-testid={`mobile-${l.testId}`}
                  href={`#${l.id}`}
                  onClick={(e) => go(e, l.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="border-b border-[#ECCEC8]/60 py-4 font-serif text-3xl font-medium text-[#2C1810]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
