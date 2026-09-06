export const WA_NUMBER = "5548992118889";
export const WA_DISPLAY = "(48) 99211-8889";
export const WA_MESSAGE =
  "Olá! Vim pelo site da Senhorita M e gostaria de agendar um horário. 😊";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export const IG_HANDLE = "@senhoritamsalao";
export const IG_LINK = "https://instagram.com/senhoritamsalao";

export const ADDRESS = {
  street: "Av. Madre Benvenuta, 1548",
  district: "Santa Mônica",
  city: "Florianópolis — SC",
};
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Av.+Madre+Benvenuta,+1548+-+Santa+M%C3%B4nica,+Florian%C3%B3polis+-+SC";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Av.+Madre+Benvenuta,+1548+-+Santa+M%C3%B4nica,+Florian%C3%B3polis+-+SC&output=embed";

export const NAV_LINKS = [
  { id: "inicio", label: "Início", testId: "nav-link-inicio" },
  { id: "sobre", label: "Sobre", testId: "nav-link-sobre" },
  { id: "servicos", label: "Serviços", testId: "nav-link-servicos" },
  { id: "resultados", label: "Resultados", testId: "nav-link-resultados" },
  { id: "contato", label: "Contato", testId: "nav-link-contato" },
];

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -68, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Fotos reais da Senhorita M (somente imagens da cliente — nunca IA ou stock)
export const IMAGES = {
  logo: "/images/logo.jpg",
  salonFlowers: "/images/salao-flores.jpg",
  salonWide: "/images/salao-amplo.jpg",
  hairWaves: "/images/cabelo-ondas.jpg",
  editorial: "/images/editorial-escova.jpg",
  hairBefore: "/images/antes.jpg",
  hairAfter: "/images/depois.jpg",
  hairMechas: "/images/cabelo-mechas.jpg",
  hairBlondeWaves: "/images/cabelo-loiro-ondas.jpg",
  hairBlonde: "/images/cabelo-loiro.jpg",
  nailsRed: "/images/unhas-vermelhas.jpg",
  nailsLight: "/images/unhas-claras.jpg",
  nailDisplay: "/images/expositor-esmaltes.jpg",
  nailsBefore: "/images/unhas-antes.jpg",
  nailsAfter: "/images/unhas-depois.jpg",
  makeup1: "/images/maquiagem-1.jpg",
  makeup2: "/images/maquiagem-2.jpg",
  makeup3: "/images/maquiagem-3.jpg",
  makeup4: "/images/maquiagem-4.jpg",
  browsBefore: "/images/sobrancelhas-antes.jpg",
  browsAfter: "/images/sobrancelhas-depois.jpg",
  hairExtra1: "/images/cabelo-extra-1.jpg",
  facade: "/images/fachada.jpg",
};

export const SERVICES = [
  {
    id: "nail-designer",
    title: "Nail Designer",
    tagline: "Unhas impecáveis em cada detalhe",
    items: [
      "Alongamento em fibra de vidro",
      "Alongamento em acrílico",
      "Molde F4",
      "Esmaltação em gel",
      "Manicure tradicional",
      "Banho de gel",
      "Blindagem",
      "Unhas decoradas",
      "Spa dos pés",
    ],
  },
  {
    id: "cabeleireira",
    title: "Cabeleireira",
    tagline: "Cabelos que valorizam a sua essência",
    items: ["Mechas", "Coloração", "Escova", "Penteados"],
  },
  {
    id: "cilios",
    title: "Cílios",
    tagline: "Um olhar ainda mais marcante",
    items: ["Pop Lash", "Fio a fio", "Volume russo", "Volume brasileiro"],
  },
  {
    id: "sobrancelhas",
    title: "Sobrancelhas",
    tagline: "Design que harmoniza a sua expressão",
    items: ["Design", "Henna"],
  },
  {
    id: "maquiagem",
    title: "Maquiagem",
    tagline: "Uma produção à altura dos seus momentos especiais",
    items: ["Maquiagem"],
  },
  {
    id: "estetica-corporal",
    title: "Estética Corporal",
    tagline: "Bem-estar e cuidado para o seu corpo",
    featured: true,
    items: [
      "Drenagem Linfática",
      "Massagem Modeladora",
      "Massagem Relaxante",
      "Massagem Terapêutica",
      "Shiatsu",
      "Ventosaterapia",
    ],
  },
];

export const BEFORE_AFTER = [
  {
    id: "cabelo",
    label: "Cabelo",
    pairs: [{ before: "/images/antes.jpg", after: "/images/depois.jpg" }],
    extras: [{ src: "/images/cabelo-extra-1.jpg", label: "Resultado de cabelo" }],
  },
  {
    id: "manicure",
    label: "Manicure",
    pairs: [
      { before: "/images/unhas-antes.jpg", after: "/images/unhas-depois.jpg" },
    ],
  },
  {
    id: "sobrancelhas",
    label: "Sobrancelhas",
    pairs: [
      {
        before: "/images/sobrancelhas-antes.jpg",
        after: "/images/sobrancelhas-depois.jpg",
      },
    ],
  },
];

export const REVIEWS = [
  {
    name: "Helena Scheunemann",
    text: "O atendimento aqui é muito bom. Os serviços e as profissionais são excelentes! O spa dos pés uma experiência maravilhosa! Recomendo muito!",
  },
  {
    name: "Pollyana Rosa",
    text: "Maravilhosa! Salão com ambiente agradável e confortável e serviço muito bem feito! Foi minha primeira vez mas já conquistaram uma cliente.",
  },
  {
    name: "Vanuza Gomes",
    text: "Un lugar super elegante e aconchegante para quem realmente procura um atendimento tive uma ótima experiência com a nail designer flor com a esmaltação em gel que sinceramente ela arrasa no trabalho gratidão equipe senhoritas M desde a parte de agendamento até a parte de atendimento obrigada a todas lindas! Logo estarei de volta 😊",
  },
  {
    name: "Scheila Maria Fernandes de Oliveira",
    text: "Primeira cliente do salao, qdo da abertura. Só elogios à equipe. Neia, proprietária, fina, chique, muito educada e atenciosa. Marcia e Ana Claudia ambas muito atenciosas, simpaticas, sempre preocupadas com o bem estar dos clientes. Super recomendo o salão. Venha e tenha a mesma experiência que eu tenho toda semana.",
  },
];

export const TRUST_ITEMS = [
  "Atendimento personalizado",
  "Profissionais especializados",
  "Ambiente acolhedor",
  "Experiência em beleza",
];

export const DIFFERENTIALS = [
  "Atendimento personalizado",
  "Cuidado em cada detalhe",
  "Técnicas atualizadas",
  "Ambiente acolhedor",
];
