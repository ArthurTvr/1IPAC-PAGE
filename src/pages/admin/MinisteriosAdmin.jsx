import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function MinisteriosAdmin() {
  const navigate = useNavigate();

  const [ministerios, setMinisterios] = useState([]);
  const [ministerioSelecionado, setMinisterioSelecionado] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [orientador, setOrientador] = useState("");
  const [conselheiro, setConselheiro] = useState("");
  const [anoDiretoria, setAnoDiretoria] = useState(
    new Date().getFullYear()
  );
  const [ativo, setAtivo] = useState(true);

  const [diretoria, setDiretoria] = useState([]);
  const [idsOriginais, setIdsOriginais] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [carregandoDiretoria, setCarregandoDiretoria] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    async function carregarMinisterios() {
      setCarregando(true);

      const { data, error } = await supabase
        .from("ministerios")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        setErro("Não foi possível carregar os ministérios.");
        setCarregando(false);
        return;
      }

      setMinisterios(data || []);
      setCarregando(false);
    }

    carregarMinisterios();
  }, []);

  useEffect(() => {
    if (!ministerioSelecionado?.id || !anoDiretoria) {
      return;
    }

    async function carregarDiretoria() {
      setCarregandoDiretoria(true);
      setErro("");

      const { data, error } = await supabase
        .from("ministerio_diretoria")
        .select("*")
        .eq("ministerio_id", ministerioSelecionado.id)
        .eq("ano", Number(anoDiretoria))
        .order("ordem", { ascending: true });

      if (error) {
        console.error(error);
        setErro("Não foi possível carregar a diretoria.");
        setCarregandoDiretoria(false);
        return;
      }

      const registros = data || [];

      setDiretoria(
        registros.map((item) => ({
          id: item.id,
          cargo: item.cargo,
          nome: item.nome,
        }))
      );

      setIdsOriginais(registros.map((item) => item.id));

      setCarregandoDiretoria(false);
    }

    carregarDiretoria();
  }, [ministerioSelecionado?.id, anoDiretoria]);

  function selecionarMinisterio(ministerio) {
    setMinisterioSelecionado(ministerio);

    setDescricao(ministerio.descricao || "");
    setOrientador(ministerio.orientador || "");
    setConselheiro(ministerio.conselheiro || "");

    setAnoDiretoria(
      ministerio.ano_diretoria || new Date().getFullYear()
    );

    setAtivo(ministerio.ativo ?? true);

    setErro("");
    setSucesso("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function adicionarCargo() {
    setDiretoria((anterior) => [
      ...anterior,
      {
        id: null,
        cargo: "",
        nome: "",
      },
    ]);
  }

  function alterarCargo(index, campo, valor) {
    setDiretoria((anterior) =>
      anterior.map((item, i) =>
        i === index
          ? {
              ...item,
              [campo]: valor,
            }
          : item
      )
    );
  }

  function removerCargo(index) {
    setDiretoria((anterior) =>
      anterior.filter((_, i) => i !== index)
    );
  }

  async function salvarMinisterio(e) {
    e.preventDefault();

    if (!ministerioSelecionado) {
      return;
    }

    setErro("");
    setSucesso("");

    const cargosIncompletos = diretoria.some(
      (item) =>
        (item.cargo.trim() && !item.nome.trim()) ||
        (!item.cargo.trim() && item.nome.trim())
    );

    if (cargosIncompletos) {
      setErro(
        "Preencha o cargo e o nome de todos os membros da diretoria."
      );
      return;
    }

    const diretoriaPreenchida = diretoria.filter(
      (item) => item.cargo.trim() && item.nome.trim()
    );

    setSalvando(true);

    // Atualiza os dados principais do ministério
    const { error: erroMinisterio } = await supabase
      .from("ministerios")
      .update({
        descricao: descricao.trim(),
        orientador: orientador.trim(),
        conselheiro: conselheiro.trim(),
        ano_diretoria: Number(anoDiretoria),
        ativo,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ministerioSelecionado.id);

    if (erroMinisterio) {
      console.error(erroMinisterio);
      setErro("Não foi possível atualizar o ministério.");
      setSalvando(false);
      return;
    }

    // Descobre quais registros existentes foram removidos
    const idsMantidos = diretoriaPreenchida
      .filter((item) => item.id)
      .map((item) => item.id);

    const idsRemovidos = idsOriginais.filter(
      (id) => !idsMantidos.includes(id)
    );

    // Exclui cargos removidos
    if (idsRemovidos.length > 0) {
      const { error: erroExcluir } = await supabase
        .from("ministerio_diretoria")
        .delete()
        .in("id", idsRemovidos);

      if (erroExcluir) {
        console.error(erroExcluir);
        setErro("Erro ao remover membros antigos da diretoria.");
        setSalvando(false);
        return;
      }
    }

    // Atualiza os registros que já existiam
    for (let index = 0; index < diretoriaPreenchida.length; index++) {
      const membro = diretoriaPreenchida[index];

      if (!membro.id) {
        continue;
      }

      const { error } = await supabase
        .from("ministerio_diretoria")
        .update({
          cargo: membro.cargo.trim(),
          nome: membro.nome.trim(),
          ordem: index + 1,
        })
        .eq("id", membro.id);

      if (error) {
        console.error(error);
        setErro("Erro ao atualizar a diretoria.");
        setSalvando(false);
        return;
      }
    }

    // Insere novos registros
    const novosMembros = diretoriaPreenchida
      .map((membro, index) => ({
        ...membro,
        ordem: index + 1,
      }))
      .filter((membro) => !membro.id)
      .map((membro) => ({
        ministerio_id: ministerioSelecionado.id,
        ano: Number(anoDiretoria),
        cargo: membro.cargo.trim(),
        nome: membro.nome.trim(),
        ordem: membro.ordem,
      }));

    if (novosMembros.length > 0) {
      const { error: erroInserir } = await supabase
        .from("ministerio_diretoria")
        .insert(novosMembros);

      if (erroInserir) {
        console.error(erroInserir);
        setErro("Erro ao cadastrar membros da diretoria.");
        setSalvando(false);
        return;
      }
    }

    // Atualiza lista local de ministérios
    setMinisterios((anteriores) =>
      anteriores.map((item) =>
        item.id === ministerioSelecionado.id
          ? {
              ...item,
              descricao: descricao.trim(),
              orientador: orientador.trim(),
              conselheiro: conselheiro.trim(),
              ano_diretoria: Number(anoDiretoria),
              ativo,
            }
          : item
      )
    );

    setMinisterioSelecionado((anterior) => ({
      ...anterior,
      descricao: descricao.trim(),
      orientador: orientador.trim(),
      conselheiro: conselheiro.trim(),
      ano_diretoria: Number(anoDiretoria),
      ativo,
    }));

    // Recarrega a diretoria para pegar IDs novos
    const { data: diretoriaAtualizada } = await supabase
      .from("ministerio_diretoria")
      .select("*")
      .eq("ministerio_id", ministerioSelecionado.id)
      .eq("ano", Number(anoDiretoria))
      .order("ordem", { ascending: true });

    if (diretoriaAtualizada) {
      setDiretoria(
        diretoriaAtualizada.map((item) => ({
          id: item.id,
          cargo: item.cargo,
          nome: item.nome,
        }))
      );

      setIdsOriginais(
        diretoriaAtualizada.map((item) => item.id)
      );
    }

    setSalvando(false);
    setSucesso("Ministério atualizado com sucesso!");

    setTimeout(() => {
      setSucesso("");
    }, 3000);
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
              Ministérios
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-sm font-semibold text-[#164342] transition hover:text-[#7F7C3F]"
          >
            ← Voltar ao painel
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* TÍTULO */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
            Sociedades
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-[#164342]">
            Gerenciar Ministérios
          </h2>

          <p className="mt-2 text-neutral-500">
            Escolha uma sociedade para editar suas informações.
          </p>
        </div>

        {/* LISTA DE MINISTÉRIOS */}
        {carregando ? (
          <div className="border border-[#164342]/10 bg-white p-10 text-center text-neutral-500">
            Carregando ministérios...
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ministerios.map((ministerio) => (
              <button
                key={ministerio.id}
                type="button"
                onClick={() => selecionarMinisterio(ministerio)}
                className={`border p-6 text-left transition ${
                  ministerioSelecionado?.id === ministerio.id
                    ? "border-[#164342] bg-[#164342] text-white"
                    : "border-[#164342]/10 bg-white hover:border-[#164342]/40"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    ministerioSelecionado?.id === ministerio.id
                      ? "text-[#c5c078]"
                      : "text-[#7F7C3F]"
                  }`}
                >
                  Sociedade
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {ministerio.nome}
                </h3>

                <p
                  className={`mt-2 text-xs leading-5 ${
                    ministerioSelecionado?.id === ministerio.id
                      ? "text-white/60"
                      : "text-neutral-400"
                  }`}
                >
                  {ministerio.nome_completo}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* FORMULÁRIO */}
        {ministerioSelecionado && (
          <form
            onSubmit={salvarMinisterio}
            className="mt-10 border border-[#164342]/10 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
                Editando
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#164342]">
                {ministerioSelecionado.nome}
              </h2>

              <p className="mt-1 text-neutral-500">
                {ministerioSelecionado.nome_completo}
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

            {/* DESCRIÇÃO */}
            <div>
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
                placeholder="Escreva uma descrição sobre a sociedade..."
                className="w-full resize-y border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-[#164342]"
              />
            </div>

            {/* ORIENTADOR / CONSELHEIRO */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="orientador"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Orientador
                </label>

                <input
                  id="orientador"
                  type="text"
                  value={orientador}
                  onChange={(e) => setOrientador(e.target.value)}
                  placeholder="Nome do orientador"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>

              <div>
                <label
                  htmlFor="conselheiro"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Conselheiro
                </label>

                <input
                  id="conselheiro"
                  type="text"
                  value={conselheiro}
                  onChange={(e) => setConselheiro(e.target.value)}
                  placeholder="Nome do conselheiro"
                  className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                />
              </div>
            </div>

            {/* ANO */}
            <div className="mt-6 max-w-xs">
              <label
                htmlFor="ano"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Ano da diretoria
              </label>

              <input
                id="ano"
                type="number"
                min="1900"
                max="2100"
                value={anoDiretoria}
                onChange={(e) => setAnoDiretoria(e.target.value)}
                className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
              />

              <p className="mt-2 text-xs leading-5 text-neutral-400">
                Ao mudar o ano, a diretoria correspondente será carregada.
              </p>
            </div>

            {/* DIRETORIA */}
            <div className="mt-10 border-t border-neutral-100 pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
                    Gestão {anoDiretoria}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#164342]">
                    Diretoria
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={adicionarCargo}
                  className="border border-[#164342]/20 px-5 py-2.5 text-sm font-semibold text-[#164342] transition hover:bg-[#164342] hover:text-white"
                >
                  + Adicionar cargo
                </button>
              </div>

              {carregandoDiretoria ? (
                <div className="mt-6 border border-neutral-100 p-8 text-center text-sm text-neutral-500">
                  Carregando diretoria...
                </div>
              ) : diretoria.length === 0 ? (
                <div className="mt-6 border border-dashed border-neutral-300 p-8 text-center">
                  <p className="text-sm text-neutral-500">
                    Nenhum membro cadastrado para {anoDiretoria}.
                  </p>

                  <button
                    type="button"
                    onClick={adicionarCargo}
                    className="mt-4 text-sm font-semibold text-[#164342]"
                  >
                    + Adicionar primeiro cargo
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {diretoria.map((membro, index) => (
                    <div
                      key={membro.id || `novo-${index}`}
                      className="grid gap-3 border border-neutral-100 p-4 md:grid-cols-[1fr_1fr_auto]"
                    >
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-400">
                          Cargo
                        </label>

                        <input
                          type="text"
                          value={membro.cargo}
                          onChange={(e) =>
                            alterarCargo(
                              index,
                              "cargo",
                              e.target.value
                            )
                          }
                          placeholder="Ex.: Presidente"
                          className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-400">
                          Nome
                        </label>

                        <input
                          type="text"
                          value={membro.nome}
                          onChange={(e) =>
                            alterarCargo(
                              index,
                              "nome",
                              e.target.value
                            )
                          }
                          placeholder="Nome do membro"
                          className="w-full border border-neutral-300 px-4 py-3 outline-none transition focus:border-[#164342]"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removerCargo(index)}
                          className="w-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white md:w-auto"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ATIVO */}
            <label className="mt-8 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
                className="h-4 w-4 accent-[#164342]"
              />

              <span className="text-sm text-neutral-700">
                Ministério ativo
              </span>
            </label>

            {/* SALVAR */}
            <div className="mt-8 border-t border-neutral-100 pt-8">
              <button
                type="submit"
                disabled={salvando}
                className="bg-[#164342] px-8 py-3.5 font-semibold text-white transition hover:bg-[#0F3433] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}