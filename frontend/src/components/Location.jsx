import { Instagram, MapPin } from "lucide-react";
import { ADDRESS, IG_HANDLE, IG_LINK, IMAGES, MAPS_EMBED, MAPS_LINK, WA_DISPLAY, WA_LINK } from "../data/site";
import { CtaButton, Reveal, SectionHeading } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const Location = () => (
  <section
    id="contato"
    data-testid="localizacao-section"
    className="bg-[#FDFBF7] py-20 sm:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        chapter="07"
        eyebrow="Localização & Contato"
        title="VENHA NOS VISITAR"
        testId="localizacao-heading"
      />

      <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
        <Reveal className="h-full">
          <figure
            data-testid="localizacao-fachada"
            className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-[#ECCEC8] shadow-[0_20px_45px_-25px_rgba(44,24,16,0.25)]"
          >
            <img
              src={IMAGES.facade}
              alt="Fachada do Senhorita M Espaço de Beleza na Av. Madre Benvenuta, 1548"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              data-testid="localizacao-fachada-photo"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2C1810]/85 via-[#2C1810]/35 to-transparent px-7 pb-6 pt-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E8B4A4]">
                Reconheça nosso espaço
              </p>
              <p className="mt-1.5 font-serif text-xl italic text-[#FDFBF7]">
                Nossa fachada na Av. Madre Benvenuta, 1548
              </p>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal className="h-full">
          <div className="flex h-full flex-col justify-between gap-9 rounded-3xl border border-[#ECCEC8] bg-[#F9F5F0] p-8 sm:p-11">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B05B4B]">
                Endereço
              </p>
              <address
                data-testid="localizacao-address-text"
                className="mt-4 font-serif text-2xl font-medium not-italic leading-snug text-[#2C1810] sm:text-3xl"
              >
                {ADDRESS.street}
                <br />
                {ADDRESS.district}
                <br />
                {ADDRESS.city}
              </address>

              <div className="mt-8 space-y-3.5">
                <a
                  data-testid="localizacao-whatsapp-link"
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-[#4A3B34] transition-colors hover:text-[#B05B4B]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#B05B4B]">
                    <WhatsAppIcon size={15} />
                  </span>
                  WhatsApp:{" "}{WA_DISPLAY}
                </a>
                <a
                  data-testid="localizacao-instagram-link"
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-[#4A3B34] transition-colors hover:text-[#B05B4B]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#B05B4B]">
                    <Instagram size={15} strokeWidth={1.8} />
                  </span>
                  Instagram:{" "}{IG_HANDLE}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaButton
                href={MAPS_LINK}
                testId="localizacao-button-maps"
                icon={<MapPin size={16} strokeWidth={1.8} />}
                className="flex-1"
              >
                Como chegar
              </CtaButton>
              <CtaButton
                href={WA_LINK}
                variant="outline"
                testId="localizacao-button-whatsapp"
                icon={<WhatsAppIcon size={16} />}
                className="flex-1"
              >
                Agendar horário
              </CtaButton>
            </div>
          </div>
        </Reveal>

      </div>

      <Reveal delay={0.12}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#ECCEC8] shadow-[0_20px_45px_-25px_rgba(44,24,16,0.25)]">
          <iframe
            data-testid="localizacao-map-frame"
            title="Mapa — Senhorita M Espaço de Beleza, Av. Madre Benvenuta 1548, Florianópolis"
            src={MAPS_EMBED}
            className="h-[380px] w-full"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </div>
  </section>
);
