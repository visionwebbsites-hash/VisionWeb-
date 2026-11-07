import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { IMAGES } from "../data/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] px-6 text-center">
      <Seo
        title="Página não encontrada | Senhorita M Espaço de Beleza"
        description="A página que você procura não existe. Volte para a página inicial da Senhorita M Espaço de Beleza em Florianópolis."
        path="/404"
      />
      <img
        src={IMAGES.logo}
        alt="Logo Senhorita M"
        className="h-16 w-16 rounded-full border border-[#ECCEC8] object-cover"
      />
      <h1 className="mt-8 font-serif text-5xl font-medium text-[#2C1810]">404</h1>
      <p className="mt-3 max-w-sm text-base text-[#827168]">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        data-testid="notfound-home-link"
        to="/"
        className="mt-8 rounded-full bg-[#B05B4B] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#984A3B]"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
