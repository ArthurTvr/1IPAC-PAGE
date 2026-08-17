export default function Sobre() {
  return (
    <section id="sobre" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334"
            alt="Nossa igreja"
            className="h-[500px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#164342]">
            Quem somos
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Uma comunidade centrada no Evangelho
          </h2>

          <p className="mt-7 leading-8 text-neutral-600">
            Somos uma comunidade cristã comprometida com a Palavra de Deus,
            com a comunhão entre irmãos e com a proclamação do Evangelho.
          </p>

          <p className="mt-4 leading-8 text-neutral-600">
            Nosso desejo é que cada pessoa encontre um lugar para crescer na
            fé, servir ao próximo e desenvolver um relacionamento cada vez
            mais profundo com Deus.
          </p>

          <button className="mt-8 border-b-2 border-[#164342] pb-1 font-semibold text-[#174c36]">
            Conheça nossa história →
          </button>
        </div>
      </div>
    </section>
  );
}