import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import EventoModal from "./EventoModal";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarEventos();
  }, []);

  function obterDataHoje() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  async function carregarEventos() {
    setCarregando(true);

    const hoje = obterDataHoje();

    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("ativo", true)
      .gte("data", hoje)
      .order("data", { ascending: true })
      .order("horario", { ascending: true })
      .limit(3);

    if (error) {
      console.error("Erro ao carregar eventos:", error);
      setCarregando(false);
      return;
    }

    setEventos(data || []);
    setCarregando(false);
  }

  function obterDia(dataEvento) {
    const data = new Date(`${dataEvento}T00:00:00`);

    return String(data.getDate()).padStart(2, "0");
  }

  function obterMes(dataEvento) {
    const data = new Date(`${dataEvento}T00:00:00`);

    return data
      .toLocaleDateString("pt-BR", {
        month: "short",
      })
      .replace(".", "")
      .toUpperCase();
  }

  function formatarHorario(horario) {
    if (!horario) return "";

    return horario.slice(0, 5);
  }

  if (carregando) {
    return null;
  }

  if (eventos.length === 0) {
    return null;
  }

  return (
    <>
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
                key={evento.id}
                className="group flex flex-col gap-6 py-8 sm:flex-row sm:items-center"
              >
                <div className="w-20">
                  <span className="block text-4xl font-bold text-[#164342]">
                    {obterDia(evento.data)}
                  </span>

                  <span className="text-sm font-semibold tracking-widest text-neutral-500">
                    {obterMes(evento.data)}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">
                    {evento.titulo}
                  </h3>

                  <p className="mt-2 text-neutral-500">
                    {evento.horario
                      ? `${formatarHorario(evento.horario)} • ${evento.local}`
                      : evento.local}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEventoSelecionado(evento)}
                  className="text-left font-semibold text-[#164342]"
                >
                  Saiba mais →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventoModal
        evento={eventoSelecionado}
        onClose={() => setEventoSelecionado(null)}
      />
    </>
  );
}