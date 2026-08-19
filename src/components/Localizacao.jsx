export default function Localizacao() {
  const plusCode = "H48J+3H Alto Caparaó, Minas Gerais";

  const localMaps = encodeURIComponent(plusCode);

  return (
    <section id="contato" className="bg-[#f4f1ea] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
            Venha nos visitar
          </p>

          <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-[#164342] md:text-5xl">
            Você será muito bem-vindo
          </h2>

          <div className="mt-6 h-[2px] w-14 bg-[#7F7C3F]" />

          <p className="mt-7 max-w-lg leading-7 text-neutral-600">
            Será uma alegria receber você e sua família em nossa igreja.
            Venha participar conosco de nossos cultos e momentos de comunhão.
          </p>

          <div className="mt-9 border-t border-[#164342]/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Endereço
            </p>

            <p className="mt-3 text-lg font-semibold text-[#164342]">
              Avenida Pico da Bandeira, 86
            </p>

            <p className="mt-1 text-neutral-600">
              Alto Caparaó - MG
            </p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${localMaps}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3 bg-[#164342] px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-[#0F3433]"
          >
            Abrir no Google Maps

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="overflow-hidden border border-[#164342]/10 bg-neutral-200 shadow-sm">
          <iframe
            title="Localização da 1ª Igreja Presbiteriana de Alto Caparaó"
            src={`https://www.google.com/maps?q=${localMaps}&z=18&output=embed`}
            className="h-[400px] w-full md:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}