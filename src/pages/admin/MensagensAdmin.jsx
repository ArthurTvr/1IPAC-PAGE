import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function MensagensAdmin() {
  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [pregador, setPregador] = useState("");
  const [data, setData] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [editandoId, setEditandoId] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    carregarMensagens();
  }, []);

  async function carregarMensagens() {
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase
      .from("mensagens")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      console.error(error);
      setErro("Não foi possível carregar as mensagens.");
      setCarregando(false);
      return;
    }

    setMensagens(data || []);
    setCarregando(false);
  }

  function limparFormulario() {
    setTitulo("");
    setPregador("");
    setData("");
    setVideoUrl("");
    setAtivo(true);
    setEditandoId(null);
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setSalvando(true);

    const dadosMensagem = {
      titulo: titulo.trim(),
      pregador: pregador.trim(),
      data,
      video_url: videoUrl.trim(),
      ativo,
    };

    let error;

    if (editandoId) {
      const resultado = await supabase
        .from("mensagens")
        .update(dadosMensagem)
        .eq("id", editandoId);

      error = resultado.error;
    } else {
      const resultado = await supabase
        .from("mensagens")
        .insert(dadosMensagem);

      error = resultado.error;
    }

    setSalvando(false);

    if (error) {
      console.error(error);
      setErro(
        editandoId
          ? "Não foi possível atualizar a mensagem."
          : "Não foi possível cadastrar a mensagem."
      );
      return;
    }

    setSucesso(
      editandoId
        ? "Mensagem atualizada com sucesso!"
        : "Mensagem cadastrada com sucesso!"
    );

    limparFormulario();
    await carregarMensagens();

    setTimeout(() => {
      setSucesso("");
    }, 3000);
  }

  function editarMensagem(mensagem) {
    setTitulo(mensagem.titulo);
    setPregador(mensagem.pregador);
    setData(mensagem.data);
    setVideoUrl(mensagem.video_url);
    setAtivo(mensagem.ativo);
    setEditandoId(mensagem.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirMensagem(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta mensagem?"
    );

    if (!confirmar) return;

    setErro("");
    setSucesso("");

    const { error } = await supabase
      .from("mensagens")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setErro("Não foi possível excluir a mensagem.");
      return;
    }

    if (editandoId === id) {
      limparFormulario();
    }

    setSucesso("Mensagem excluída com sucesso!");

    await carregarMensagens();

    setTimeout(() => {
      setSucesso("");
    }, 3000);
  }

  function formatarData(dataMensagem) {
    if (!dataMensagem) return "";

    return new Date(`${dataMensagem}T00:00:00`).toLocaleDateString(
      "pt-BR"
    );
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
              Mensagens
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
              {editandoId ? "Editar" : "Nova mensagem"}
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#164342]">
              {editandoId
                ? "Editar mensagem"
                : "Cadastrar mensagem"}
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              A mensagem mais recente será exibida na página inicial
              do site.
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
                  Título da mensagem
                </label>

                <input
                  id="titulo"
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: A suficiência da graça de Deus"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* PREGADOR */}
              <div>
                <label
                  htmlFor="pregador"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Pregador
                </label>

                <input
                  id="pregador"
                  type="text"
                  required
                  value={pregador}
                  onChange={(e) => setPregador(e.target.value)}
                  placeholder="Ex.: Pr. João da Silva"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              {/* DATA */}
              <div>
                <label
                  htmlFor="data"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Data da mensagem
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

              {/* LINK */}
              <div className="md:col-span-2">
                <label
                  htmlFor="video"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Link do vídeo no YouTube
                </label>

                <input
                  id="video"
                  type="url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />

                <p className="mt-2 text-xs text-neutral-400">
                  Você pode colar o link normal do vídeo do YouTube.
                </p>
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
                Mensagem ativa
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
                  : "Cadastrar mensagem"}
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

        {/* LISTA */}
        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
                Cadastradas
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#164342]">
                Mensagens
              </h2>
            </div>

            {!carregando && (
              <span className="text-sm text-neutral-400">
                {mensagens.length}{" "}
                {mensagens.length === 1
                  ? "mensagem"
                  : "mensagens"}
              </span>
            )}
          </div>

          {carregando ? (
            <div className="border border-[#164342]/10 bg-white p-10 text-center text-neutral-500">
              Carregando mensagens...
            </div>
          ) : mensagens.length === 0 ? (
            <div className="border border-[#164342]/10 bg-white p-10 text-center">
              <p className="text-neutral-500">
                Nenhuma mensagem cadastrada.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 border border-[#164342]/10 bg-white">
              {mensagens.map((mensagem) => (
                <article
                  key={mensagem.id}
                  className="flex flex-col gap-5 p-6 md:flex-row md:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-[#7F7C3F]">
                        {formatarData(mensagem.data)}
                      </span>

                      <span
                        className={`px-2 py-1 text-xs font-semibold ${
                          mensagem.ativo
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {mensagem.ativo ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#164342]">
                      {mensagem.titulo}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {mensagem.pregador}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={mensagem.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#7F7C3F]/30 px-4 py-2 text-sm font-semibold text-[#7F7C3F] transition hover:bg-[#7F7C3F] hover:text-white"
                    >
                      Ver vídeo
                    </a>

                    <button
                      onClick={() => editarMensagem(mensagem)}
                      className="border border-[#164342]/20 px-4 py-2 text-sm font-semibold text-[#164342] transition hover:bg-[#164342] hover:text-white"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        excluirMensagem(mensagem.id)
                      }
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