export default function Localizacao() {
  return (
    <section id="contato" className="bg-[#f4f1ea] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#174c36]">
            Venha nos visitar
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Você será muito bem-vindo
          </h2>

          <div className="mt-8 space-y-4 text-neutral-600">
            <p>
              Avenida Pico da Bandeira, 61
            </p>

            <p>
              Alto Caparaó - MG
            </p>

            {/* <p>
              (00) 00000-0000
            </p> */}

            <p>
              contato@igreja.com.br
            </p>
          </div>
        </div>

        <div className="flex min-h-[350px] items-center justify-center bg-neutral-300 text-neutral-500">
          MAPA DO GOOGLE
        </div>
      </div>
    </section>
  );
}