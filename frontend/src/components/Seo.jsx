import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.senhoritamsalao.com.br";

export const Seo = ({ title, description, path }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${SITE_URL}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${SITE_URL}${path}`} />
    <meta property="og:type" content="website" />
  </Helmet>
);
