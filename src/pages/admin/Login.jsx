import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      console.error(error);

      setErro("E-mail ou senha inválidos.");
      return;
    }

    navigate("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f0] px-6">
      <div className="w-full max-w-md">

        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7F7C3F]">
            Administração
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#164342]">
            Painel da Igreja
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Entre com suas credenciais para continuar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-[#164342]/10 bg-white p-7 shadow-sm sm:p-9"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
              placeholder="••••••••"
            />
          </div>

          {erro && (
            <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="mt-7 w-full bg-[#164342] px-6 py-3.5 font-semibold text-white transition hover:bg-[#0F3433] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full text-sm font-medium text-neutral-500 transition hover:text-[#164342]"
          >
            ← Voltar para o site
          </button>
        </form>

      </div>
    </main>
  );
}