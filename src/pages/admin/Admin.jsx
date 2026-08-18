import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();

    navigate("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f7f6f0]">
      {/* HEADER */}
      <header className="border-b border-[#164342]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Administração
            </p>

            <h1 className="mt-1 text-xl font-semibold text-[#164342]">
              Painel da Igreja
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="border border-[#164342]/20 px-5 py-2 text-sm font-medium text-[#164342] transition hover:bg-[#164342] hover:text-white"
          >
            Sair
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-[#164342]">
            Painel Administrativo
          </h2>

          <p className="mt-2 text-neutral-500">
            Gerencie as informações exibidas no site.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* MENSAGENS */}
          <button
            onClick={() => navigate("/admin/mensagens")}
            className="group border border-[#164342]/10 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Conteúdo
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-[#164342]">
              Mensagens
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Cadastre e gerencie as mensagens e pregações exibidas no site.
            </p>

            <span className="mt-7 inline-block font-semibold text-[#164342] transition group-hover:translate-x-1">
              Gerenciar →
            </span>
          </button>

          {/* EVENTOS */}
          <button
            onClick={() => navigate("/admin/eventos")}
            className="group border border-[#164342]/10 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Agenda
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-[#164342]">
              Eventos
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Cadastre eventos, datas, horários, locais e descrições.
            </p>

            <span className="mt-7 inline-block font-semibold text-[#164342] transition group-hover:translate-x-1">
              Gerenciar →
            </span>
          </button>
          <button
            onClick={() => navigate("/admin/ministerios")}
            className="group border border-[#164342]/10 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Sociedades
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-[#164342]">
              Ministérios
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Gerencie descrições, orientadores, conselheiros e diretorias das
              sociedades da igreja.
            </p>

            <span className="mt-7 inline-block font-semibold text-[#164342] transition group-hover:translate-x-1">
              Gerenciar →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
