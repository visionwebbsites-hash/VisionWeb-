import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Results } from "./components/Results";
import { Space } from "./components/Space";
import { Differentials } from "./components/Differentials";
import { Testimonials } from "./components/Testimonials";
import { Location } from "./components/Location";
import { Footer } from "./components/Footer";
import { PromoBanner } from "./components/PromoBanner";
import { Seo } from "./components/Seo";
import CategoryPage from "./pages/CategoryPage";
import EsteticaPage from "./pages/EsteticaPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  return (
    <div className="bg-[#FDFBF7] text-[#2C1810]">
      <Seo
        title="Senhorita M Espaço de Beleza | Salão de Beleza em Florianópolis"
        description="Senhorita M Espaço de Beleza em Santa Mônica, Florianópolis. Cabelos, unhas, cílios e sobrancelhas com atendimento personalizado. Agende pelo WhatsApp."
        path="/"
      />
      <Header />
      <main>
        <PromoBanner />
        <Hero />
        <TrustBar />
        <Marquee />
        <About />
        <Services />
        <Results />
        <Space />
        <Differentials />
        <Testimonials />
        <Location />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cabelos"
          element={
            <CategoryPage
              category="cabelos"
              serviceId="cabeleireira"
              path="/cabelos"
              title="Cabelos"
              seoTitle="Cabeleireiro em Santa Mônica, Florianópolis | Senhorita M"
              seoDesc="Mechas, coloração, escova, penteados e corte de cabelo na Senhorita M, salão de beleza em Santa Mônica, Florianópolis. Agende pelo WhatsApp."
              intro="Mechas, coloração, escova, penteados e corte — cuidado completo para os seus cabelos, com atendimento personalizado na Senhorita M."
            />
          }
        />
        <Route
          path="/manicure"
          element={
            <CategoryPage
              category="manicure"
              serviceId="nail-designer"
              path="/manicure"
              title="Manicure"
              seoTitle="Manicure em Santa Mônica, Florianópolis | Senhorita M"
              seoDesc="Alongamento de unhas, esmaltação em gel, manicure tradicional e spa dos pés na Senhorita M, Santa Mônica, Florianópolis. Agende pelo WhatsApp."
              intro="Alongamentos, esmaltação em gel, nail art e spa dos pés — unhas impecáveis em cada detalhe, na Senhorita M."
            />
          }
        />
        <Route path="/sobrancelhas" element={<CategoryPage key="sobrancelhas" category="sobrancelhas" serviceId="sobrancelhas" path="/sobrancelhas" title="Sobrancelhas" seoTitle="Sobrancelhas em Santa Mônica, Florianópolis | Senhorita M" seoDesc="Design de sobrancelhas e henna na Senhorita M, em Santa Mônica, Florianópolis. Conheça nossos trabalhos e agende pelo WhatsApp." intro="Design e henna para realçar a expressão do seu rosto, com cuidado personalizado na Senhorita M." />} />
        <Route path="/maquiagem" element={<CategoryPage key="maquiagem" category="maquiagem" serviceId="maquiagem" path="/maquiagem" title="Maquiagem" seoTitle="Maquiagem em Santa Mônica, Florianópolis | Senhorita M" seoDesc="Maquiagem social, para eventos e produção fotográfica na Senhorita M, Santa Mônica, Florianópolis. Conheça nossos trabalhos e agende." intro="Maquiagem social, para eventos e produção fotográfica — uma produção pensada para os seus momentos especiais." />} />
        <Route path="/cilios" element={<CategoryPage key="cilios" category="cilios" serviceId="cilios" path="/cilios" title="Cílios" seoTitle="Cílios em Santa Mônica, Florianópolis | Senhorita M" seoDesc="Extensão de cílios na Senhorita M, Santa Mônica, Florianópolis. Pop Lash, fio a fio, volume russo e brasileiro. Agende pelo WhatsApp." intro="Pop Lash, fio a fio, volume russo e volume brasileiro — cuidados para valorizar o seu olhar." />} />
        <Route path="/estetica" element={<EsteticaPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
