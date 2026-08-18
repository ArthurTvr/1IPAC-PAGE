import { useNavigate } from "react-router-dom";

export default function Historia() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f7f6f0] pt-24 lg:pt-28">

      {/* CABEÇALHO */}
      <section className="border-b border-[#164342]/10">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 lg:px-8">

          {/* VOLTAR */}
          <button
            onClick={() => navigate(-1)}
            className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#164342] transition hover:text-[#7F7C3F]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            Voltar
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7F7C3F]">
            Nossa trajetória
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[#164342] sm:text-5xl md:text-6xl">
            História da 1ª Igreja Presbiteriana de Alto Caparaó
          </h1>

          <div className="mt-7 h-[2px] w-14 bg-[#7F7C3F]" />
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">

          {/* COLUNA LATERAL */}
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Nossa História
            </p>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Conheça a trajetória, os acontecimentos e as pessoas que fizeram
              parte da história da nossa igreja.
            </p>
          </aside>

          {/* TEXTO PRINCIPAL */}
          <article className="max-w-3xl">

            {/* INTRODUÇÃO OPCIONAL */}
            <p className="mb-10 text-xl leading-9 text-[#164342] md:text-2xl md:leading-10">
              {/* Cole aqui um pequeno texto de introdução, se desejar. */}
              A história da nossa igreja é marcada pela fidelidade de Deus e
              pelo trabalho de homens e mulheres que dedicaram suas vidas à
              proclamação do Evangelho.
            </p>

            <div className="h-px w-full bg-[#164342]/10" />

            {/* COLE A HISTÓRIA A PARTIR DAQUI */}
            <div className="mt-10 space-y-7 text-base leading-8 text-neutral-600 md:text-lg md:leading-9">

              <p>
                Cole aqui o primeiro parágrafo da história da igreja.
              </p>

              <p>
                Cole aqui o segundo parágrafo. Você pode adicionar quantos
                parágrafos forem necessários para contar toda a trajetória da
                igreja.
              </p>

              <p>
                Continue adicionando o restante do texto nesta área.
              </p>

            </div>

          </article>
        </div>
      </section>

      {/* FINAL DA PÁGINA */}
      <section className="bg-[#164342]">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5c078]">
            1ª Igreja Presbiteriana
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-relaxed text-white md:text-3xl">
            Uma história construída pela graça de Deus e para a glória de Deus.
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#164342]"
          >
            ← Voltar
          </button>
        </div>
      </section>

    </main>
  );
}