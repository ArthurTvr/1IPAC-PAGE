const ministerios = [
  {
    nome: "Crianças (UCP)",
    imagem:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
  },
  {
    nome: "Jovens (UMP)",
    imagem:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
  {
    nome: "ADOLESCENTES (UPA)",
    imagem:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
  {
    nome: "Mulheres (SAF)",
    imagem:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
  {
    nome: "Homens (UPH)",
    imagem:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
];

export default function Ministerios() {
  return (
    <section id="ministerios" className="bg-[#164342] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">
            Sirva conosco
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Nossos Ministérios
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ministerios.map((ministerio) => (
            <div
              key={ministerio.nome}
              className="group relative h-[400px] overflow-hidden"
            >
              <img
                src={ministerio.imagem}
                alt={ministerio.nome}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-bold">
                  {ministerio.nome}
                </h3>

                <p className="mt-2 text-sm text-white/70">
                  Conheça este ministério →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}