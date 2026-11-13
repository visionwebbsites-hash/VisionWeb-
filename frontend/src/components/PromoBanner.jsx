import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { api, API } from "../lib/api";

export const PromoBanner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    api
      .get("/banners/active")
      .then((res) => setBanner(res.data.items?.[0] || null))
      .catch(() => setBanner(null));
  }, []);

  if (!banner) return null;

  return (
    <div
      data-testid="promo-banner"
      className="border-b border-[#ECCEC8] bg-[#FAF0EE] pt-[68px]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {banner.image_url && (
          <img
            src={`${API.replace(/\/api$/, "")}${banner.image_url}`}
            alt={banner.title}
            className="h-14 w-14 rounded-full border border-[#ECCEC8] object-cover"
            loading="lazy"
            decoding="async"
            data-testid="promo-banner-image"
          />
        )}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#B05B4B]">
          <Megaphone size={16} strokeWidth={1.8} />
        </span>
        <div className="text-center sm:text-left">
          <p
            data-testid="promo-banner-title"
            className="font-serif text-lg font-semibold italic leading-tight text-[#7F3B2E]"
          >
            {banner.title}
          </p>
          {banner.description && (
            <p className="text-xs text-[#827168]">{banner.description}</p>
          )}
        </div>
        {banner.link && (
          <a
            data-testid="promo-banner-cta"
            href={banner.link}
            target={banner.link.startsWith("http") ? "_blank" : undefined}
            rel={banner.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-full bg-[#B05B4B] px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#984A3B]"
          >
            {banner.cta_label || "Saiba mais"}
          </a>
        )}
      </div>
    </div>
  );
};
