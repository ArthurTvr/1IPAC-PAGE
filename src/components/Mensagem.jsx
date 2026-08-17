export default function Mensagem() {
  return (
    <section id="mensagens" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#174c36]">
            Palavra
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Última mensagem
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="aspect-video overflow-hidden bg-neutral-900">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/h1w4grclAfc"
              title="Última mensagem"
              allowFullScreen
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#174c36]">
              Domingo • 16 de agosto
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Título da última mensagem
            </h3>

            <p className="mt-4 text-neutral-500">
              Pr. Michel Luciano
            </p>

            <p className="mt-6 leading-7 text-neutral-600">
              Assista à última mensagem ministrada em nossa igreja e acompanhe
              nossos cultos e estudos bíblicos.
            </p>

            <button className="mt-7 bg-[#164342] px-7 py-3 font-semibold text-white transition hover:bg-[#123d2b]">
              Ver todas as mensagens
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}