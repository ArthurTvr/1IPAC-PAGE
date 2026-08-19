const programacao = [
  {
    dia: "Segunda-feira",
    eventos: ["19:00 — Pequenos Grupos"],
  },
  {
    dia: "Quarta-feira",
    eventos: ["19:00 — Estudo Bíblico"],
  },
  {
    dia: "Domingo",
    eventos: ["09:20 — Reunião de Oração","10:00 — Escola Bíblica Dominical", "19:00 — Culto de Adoração"],
  },
];

export default function Programacao() {
  return (
    <section className="bg-neutral-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#164342]">
            Durante a semana
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Nossa programação
          </h2>
        </div>

        <div className="divide-y divide-neutral-300">
          {programacao.map((item) => (
            <div
              key={item.dia}
              className="grid gap-5 py-8 md:grid-cols-3"
            >
              <h3 className="text-xl font-bold text-[#164342]">
                {item.dia}
              </h3>

              <div className="space-y-2 md:col-span-2">
                {item.eventos.map((evento) => (
                  <p key={evento} className="text-neutral-600">
                    {evento}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}