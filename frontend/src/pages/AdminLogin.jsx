import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { api, formatApiError } from "../lib/api";
import { IMAGES } from "../data/site";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("sm_admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F5F0] px-4">
      <Helmet>
        <title>Área administrativa | Senhorita M</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <form
        data-testid="admin-login-form"
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-[#ECCEC8] bg-white p-8 shadow-[0_20px_45px_-25px_rgba(44,24,16,0.2)]"
      >
        <div className="flex flex-col items-center">
          <img
            src={IMAGES.logo}
            alt="Logo Senhorita M"
            className="h-14 w-14 rounded-full border border-[#ECCEC8] object-cover"
          />
          <h1 className="mt-5 font-serif text-2xl font-medium text-[#2C1810]">
            Área administrativa
          </h1>
          <p className="mt-1 text-xs text-[#827168]">Acesso restrito</p>
        </div>
        <label className="mt-7 block text-xs font-semibold uppercase tracking-[0.14em] text-[#7F3B2E]">
          E-mail
          <input
            data-testid="admin-login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-4 py-3 text-sm normal-case tracking-normal text-[#2C1810] outline-none focus:border-[#B05B4B]"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-[#7F3B2E]">
          Senha
          <input
            data-testid="admin-login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#ECCEC8] bg-[#FDFBF7] px-4 py-3 text-sm normal-case tracking-normal text-[#2C1810] outline-none focus:border-[#B05B4B]"
          />
        </label>
        {error && (
          <p data-testid="admin-login-error" className="mt-4 rounded-xl bg-[#FAF0EE] px-4 py-2.5 text-xs text-[#984A3B]">
            {error}
          </p>
        )}
        <button
          data-testid="admin-login-submit"
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#B05B4B] py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#984A3B] disabled:opacity-60"
        >
          <Lock size={15} />
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
