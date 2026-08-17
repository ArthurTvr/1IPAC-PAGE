const cultos = [
  {
    dia: "Domingo",
    horarios: [
      "09:00 - Reunião de Oração",
      "10:00 — Escola Bíblica Dominical",
      "19:00 — Culto de Adoração",
    ],
  },
  {
    dia: "Quarta-feira",
    horarios: [
      "19:30 — Estudo Bíblico",
    ],
  },
];

export default function Cultos() {
  return (
    <section id="cultos" className="bg-[#f7f6f0] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* TÍTULO */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7F7C3F]">
            Participe conosco
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#164342] md:text-4xl">
            Nossos Cultos
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-12 bg-[#7F7C3F]" />
        </div>

        {/* CULTOS */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          {cultos.map((culto, index) => (
            <div
              key={culto.dia}
              className={`
                flex justify-center
                ${
                  index > 0
                    ? "md:border-l md:border-[#164342]/15"
                    : ""
                }
              `}
            >
              <div className="w-full max-w-sm">

                <h3 className="mb-6 text-center text-xl font-semibold uppercase tracking-[0.15em] text-[#164342]">
                  {culto.dia}
                </h3>

                <div className="space-y-4">
                  {culto.horarios.map((horario) => (
                    <p
                      key={horario}
                      className="text-left text-base text-neutral-600 md:text-lg"
                    >
                      {horario}
                    </p>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}