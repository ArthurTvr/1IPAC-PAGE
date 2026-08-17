const eventos = [
  {
    dia: "25",
    mes: "AGO",
    titulo: "Culto Especial",
    horario: "19:30",
  },
  {
    dia: "05",
    mes: "SET",
    titulo: "Encontro de Jovens",
    horario: "19:30",
  },
  {
    dia: "20",
    mes: "SET",
    titulo: "Conferência Missionária",
    horario: "19:00",
  },
];

export default function Eventos() {
  return (
    <section id="eventos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#164342]">
            Próximos
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Eventos
          </h2>
        </div>

        <div className="divide-y">
          {eventos.map((evento) => (
            <div
              key={`${evento.dia}-${evento.titulo}`}
              className="group flex flex-col gap-6 py-8 sm:flex-row sm:items-center"
            >
              <div className="w-20">
                <span className="block text-4xl font-bold text-[#164342]">
                  {evento.dia}
                </span>

                <span className="text-sm font-semibold tracking-widest text-neutral-500">
                  {evento.mes}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  {evento.titulo}
                </h3>

                <p className="mt-2 text-neutral-500">
                  {evento.horario} • Nossa Igreja
                </p>
              </div>

              <button className="text-left font-semibold text-[#164342]">
                Saiba mais →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}