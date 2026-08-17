export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 lg:pt-28"
    >
      {/* IMAGEM */}
      <img
        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3"
        alt="Culto da igreja"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#0b2928]/75" />

      {/* GRADIENTE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">

          <div className="mb-6 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-[#9a964c]" />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d2ce87]">
              Seja bem-vindo
            </p>
            <span className="h-[2px] w-12 bg-[#9a964c]" />
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            1ª Igreja
            <span className="block font-light">
              Presbiteriana
            </span>
            <span className="block text-[#c5c078]">
              de Alto Caparaó
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Uma comunidade cristã comprometida com a Palavra de Deus,
            a comunhão dos santos e a proclamação do Evangelho.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="#cultos"
              className="inline-flex items-center justify-center bg-[#7F7C3F] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition duration-300 hover:bg-[#97934c]"
            >
              Nossos cultos
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#164342]"
            >
              Conheça nossa igreja
            </a>

          </div>
        </div>
      </div>

      {/* SCROLL */}
      <a
        href="#cultos"
        aria-label="Ir para nossos cultos"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">
          Descubra
        </span>

        <span className="text-xl animate-bounce">
          ↓
        </span>
      </a>
    </section>
  );
}