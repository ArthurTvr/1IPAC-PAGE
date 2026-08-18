import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function EventosAdmin() {
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [editandoId, setEditandoId] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data", { ascending: true })
      .order("horario", { ascending: true });

    if (error) {
      console.error(error);
      setErro("Não foi possível carregar os eventos.");
      setCarregando(false);
      return;
    }

    setEventos(data || []);
    setCarregando(false);
  }

  function limparFormulario() {
    setTitulo("");
    setData("");
    setHorario("");
    setLocal("");
    setDescricao("");
    setAtivo(true);
    setEditandoId(null);
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setSalvando(true);

    const dadosEvento = {
      titulo: titulo.trim(),
      data,
      horario: horario || null,
      local: local.trim(),
      descricao: descricao.trim(),
      ativo,
    };

    let error;

    if (editandoId) {
      const resultado = await supabase
        .from("eventos")
        .update(dadosEvento)
        .eq("id", editandoId);

      error = resultado.error;
    } else {
      const resultado = await supabase
        .from("eventos")
        .insert(dadosEvento);

      error = resultado.error;
    }

    setSalvando(false);

    if (error) {
      console.error(error);

      setErro(
        editandoId
          ? "Não foi possível atualizar o evento."
          : "Não foi possível cadastrar o evento."
      );

      return;
    }

    setSucesso(
      editandoId
        ? "Evento atualizado com sucesso!"
        : "Evento cadastrado com sucesso!"
    );

    limparFormulario();
    await carregarEventos();

    setTimeout(() => {
      setSucesso("");
    }, 3000);
  }

  function editarEvento(evento) {
    setTitulo(evento.titulo);
    setData(evento.data);
    setHorario(evento.horario?.slice(0, 5) || "");
    setLocal(evento.local);
    setDescricao(evento.descricao || "");
    setAtivo(evento.ativo);
    setEditandoId(evento.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirEvento(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este evento?"
    );

    if (!confirmar) return;

    setErro("");
    setSucesso("");

    const { error } = await supabase
      .from("eventos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setErro("Não foi possível excluir o evento.");
      return;
    }

    if (editandoId === id) {
      limparFormulario();
    }

    setSucesso("Evento excluído com sucesso!");

    await carregarEventos();

    setTimeout(() => {
      setSucesso("");
    }, 3000);
  }

  function formatarData(dataEvento) {
    if (!dataEvento) return "";

    return new Date(`${dataEvento}T00:00:00`).toLocaleDateString("pt-BR");
  }

  function formatarHorario(horarioEvento) {
    if (!horarioEvento) return "";

    return horarioEvento.slice(0, 5);
  }

  return (
    <main className="min-h-screen bg-[#f7f6f0]">
      {/* HEADER */}
      <header className="border-b border-[#164342]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              Administração
            </p>

            <h1 className="mt-1 text-xl font-semibold text-[#164342]">
              Eventos
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="text-sm font-semibold text-[#164342] transition hover:text-[#7F7C3F]"
          >
            ← Voltar ao painel
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* FORMULÁRIO */}
        <section className="border border-[#164342]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
              {editandoId ? "Editar" : "Novo evento"}
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#164342]">
              {editandoId ? "Editar evento" : "Cadastrar evento"}
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Cadastre os eventos que serão exibidos na página inicial.
            </p>
          </div>

          {erro && (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="mb-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {sucesso}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">

              {/* TÍTULO */}
              <div className="md:col-span-2">
                <label
                  htmlFor="titulo"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Título do evento
                </label>

                <input
                  id="titulo"
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: Conferência Missionária"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* DATA */}
              <div>
                <label
                  htmlFor="data"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Data
                </label>

                <input
                  id="data"
                  type="date"
                  required
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* HORÁRIO */}
              <div>
                <label
                  htmlFor="horario"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Horário
                </label>

                <input
                  id="horario"
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* LOCAL */}
              <div className="md:col-span-2">
                <label
                  htmlFor="local"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Local
                </label>

                <input
                  id="local"
                  type="text"
                  required
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex.: 1ª Igreja Presbiteriana de Alto Caparaó"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* DESCRIÇÃO */}
              <div className="md:col-span-2">
                <label
                  htmlFor="descricao"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Descrição
                </label>

                <textarea
                  id="descricao"
                  rows="6"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Digite aqui as informações completas sobre o evento..."
                  className="w-full resize-y border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-[#164342]"
                />
              </div>
            </div>

            {/* ATIVO */}
            <label className="mt-6 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
                className="h-4 w-4 accent-[#164342]"
              />

              <span className="text-sm text-neutral-700">
                Evento ativo
              </span>
            </label>

            {/* BOTÕES */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={salvando}
                className="bg-[#164342] px-7 py-3 font-semibold text-white transition hover:bg-[#0F3433] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando
                  ? "Salvando..."
                  : editandoId
                    ? "Salvar alterações"
                    : "Cadastrar evento"}
              </button>

              {editandoId && (
                <button
                  type="button"
                  onClick={limparFormulario}
                  className="border border-neutral-300 px-7 py-3 font-semibold text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50"
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </form>
        </section>

        {/* EVENTOS CADASTRADOS */}
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
                Cadastrados
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#164342]">
                Eventos
              </h2>
            </div>

            {!carregando && (
              <span className="text-sm text-neutral-400">
                {eventos.length}{" "}
                {eventos.length === 1 ? "evento" : "eventos"}
              </span>
            )}
          </div>

          {carregando ? (
            <div className="border border-[#164342]/10 bg-white p-10 text-center text-neutral-500">
              Carregando eventos...
            </div>
          ) : eventos.length === 0 ? (
            <div className="border border-[#164342]/10 bg-white p-10 text-center text-neutral-500">
              Nenhum evento cadastrado.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 border border-[#164342]/10 bg-white">
              {eventos.map((evento) => (
                <article
                  key={evento.id}
                  className="flex flex-col gap-5 p-6 md:flex-row md:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-[#7F7C3F]">
                        {formatarData(evento.data)}

                        {evento.horario &&
                          ` • ${formatarHorario(evento.horario)}`}
                      </span>

                      <span
                        className={`px-2 py-1 text-xs font-semibold ${
                          evento.ativo
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {evento.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#164342]">
                      {evento.titulo}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {evento.local}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => editarEvento(evento)}
                      className="border border-[#164342]/20 px-4 py-2 text-sm font-semibold text-[#164342] transition hover:bg-[#164342] hover:text-white"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirEvento(evento.id)}
                      className="border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}