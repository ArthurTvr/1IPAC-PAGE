import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ministerioUCP from "../assets/images/ministeriosucp.jpeg";

const imagensMinisterios = {
  ucp: ministerioUCP,
  upa: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  ump: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  saf: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  uph: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
};

export default function Ministerio() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [ministerio, setMinisterio] = useState(null);
  const [diretoria, setDiretoria] = useState([]);

  // GALERIA
  const [fotos, setFotos] = useState([]);
  const [fotoAtual, setFotoAtual] = useState(0);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // SWIPE MOBILE
  const touchStartX = useRef(null);

  useEffect(() => {
    carregarMinisterio();
  }, [slug]);

  // =====================================================
  // CARREGAR MINISTÉRIO
  // =====================================================

  async function carregarMinisterio() {
    setCarregando(true);
    setErro("");
    setFotoAtual(0);

    // BUSCA O MINISTÉRIO
    const { data: ministerioData, error: ministerioError } = await supabase
      .from("ministerios")
      .select("*")
      .eq("slug", slug)
      .eq("ativo", true)
      .maybeSingle();

    if (ministerioError) {
      console.error("Erro ao carregar ministério:", ministerioError);

      setErro("Não foi possível carregar este ministério.");
      setCarregando(false);
      return;
    }

    if (!ministerioData) {
      setMinisterio(null);
      setCarregando(false);
      return;
    }

    setMinisterio(ministerioData);

    // =====================================================
    // BUSCA DIRETORIA
    // =====================================================

    const { data: diretoriaData, error: diretoriaError } = await supabase
      .from("ministerio_diretoria")
      .select("*")
      .eq("ministerio_id", ministerioData.id)
      .eq("ano", ministerioData.ano_diretoria)
      .order("ordem", { ascending: true });

    if (diretoriaError) {
      console.error("Erro ao carregar diretoria:", diretoriaError);

      setErro("Não foi possível carregar a diretoria.");
      setCarregando(false);
      return;
    }

    setDiretoria(diretoriaData || []);

    // =====================================================
    // BUSCA GALERIA
    // =====================================================

    const { data: fotosData, error: fotosError } = await supabase
      .from("ministerio_fotos")
      .select("*")
      .eq("ministerio_id", ministerioData.id)
      .eq("ativo", true)
      .order("ordem", { ascending: true });

    if (fotosError) {
      console.error("Erro ao carregar fotos:", fotosError);

      // Não bloqueia a página se só a galeria falhar.
      // Nesse caso usamos a imagem padrão.
      setFotos([]);
    } else {
      setFotos(fotosData || []);
    }

    setCarregando(false);
  }

  // =====================================================
  // CARROSSEL AUTOMÁTICO
  // =====================================================

  useEffect(() => {
    if (fotos.length <= 1) {
      return;
    }

    const intervalo = setInterval(() => {
      setFotoAtual((anterior) =>
        anterior === fotos.length - 1 ? 0 : anterior + 1,
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, [fotos.length]);

  function proximaFoto() {
    if (fotos.length <= 1) {
      return;
    }

    setFotoAtual((anterior) =>
      anterior === fotos.length - 1 ? 0 : anterior + 1,
    );
  }

  function fotoAnterior() {
    if (fotos.length <= 1) {
      return;
    }

    setFotoAtual((anterior) =>
      anterior === 0 ? fotos.length - 1 : anterior - 1,
    );
  }

  // =====================================================
  // SWIPE MOBILE
  // =====================================================

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;

    const diferenca = touchStartX.current - touchEndX;

    // Evita trocar por pequenos movimentos
    if (Math.abs(diferenca) > 50) {
      if (diferenca > 0) {
        proximaFoto();
      } else {
        fotoAnterior();
      }
    }

    touchStartX.current = null;
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#f7f6f0] pt-28">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-32">
          <p className="text-neutral-500">Carregando...</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERRO
  // =====================================================

  if (erro) {
    return (
      <main className="min-h-screen bg-[#f7f6f0] pt-28">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
            Ocorreu um erro
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#164342]">
            Não foi possível carregar
          </h1>

          <p className="mt-4 text-neutral-500">{erro}</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 font-semibold text-[#164342]"
          >
            ← Voltar para o site
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // NÃO ENCONTRADO
  // =====================================================

  if (!ministerio) {
    return (
      <main className="min-h-screen bg-[#f7f6f0] pt-28">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
            Ministérios
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#164342]">
            Ministério não encontrado
          </h1>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 font-semibold text-[#164342]"
          >
            ← Voltar para o site
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // IMAGENS
  // =====================================================

  const imagemPadrao =
    ministerio.imagem_url || imagensMinisterios[ministerio.slug];

  const imagensCarrossel =
    fotos.length > 0 ? fotos.map((foto) => foto.imagem_url) : [imagemPadrao];

  const imagemAtual = imagensCarrossel[fotoAtual] || imagemPadrao;

  // =====================================================
  // WHATSAPP
  // =====================================================

  const numeroWhatsapp = "5533988263667";

  const mensagemWhatsapp = encodeURIComponent(
    `Olá! Gostaria de fazer parte da ${ministerio.nome} - ${ministerio.nome_completo} da 1ª Igreja Presbiteriana de Alto Caparaó. Poderia me passar mais informações?`,
  );

  const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemWhatsapp}`;

  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* HERO / APRESENTAÇÃO */}
      <section className="bg-[#f7f6f0]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20 lg:px-8">
          {/* VOLTAR */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#164342] transition hover:text-[#7F7C3F]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Voltar
          </button>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* CARROSSEL */}
            <div
              className="group/carrossel relative h-[350px] overflow-hidden bg-neutral-200 md:h-[450px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* FAIXA DE FOTOS */}
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${fotoAtual * 100}%)`,
                }}
              >
                {imagensCarrossel.map((imagem, index) => (
                  <div key={`${imagem}-${index}`} className="h-full min-w-full">
                    <img
                      src={imagem}
                      alt={`${ministerio.nome_completo} - Foto ${index + 1}`}
                      className="h-full w-full object-cover"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>

              {/* SOMBRA LEVE */}
              {imagensCarrossel.length > 1 && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              )}

              {/* SETAS */}
              {imagensCarrossel.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={fotoAnterior}
                    aria-label="Foto anterior"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/40 text-2xl text-white backdrop-blur-sm transition hover:bg-[#164342] md:opacity-0 md:group-hover/carrossel:opacity-100"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={proximaFoto}
                    aria-label="Próxima foto"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/40 text-2xl text-white backdrop-blur-sm transition hover:bg-[#164342] md:opacity-0 md:group-hover/carrossel:opacity-100"
                  >
                    ›
                  </button>
                </>
              )}

              {/* INDICADORES */}
              {imagensCarrossel.length > 1 && (
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                  {imagensCarrossel.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFotoAtual(index)}
                      aria-label={`Ir para foto ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        fotoAtual === index
                          ? "w-7 bg-white"
                          : "w-2.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* INFORMAÇÕES */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7F7C3F]">
                Sociedade Interna
              </p>

              <h1 className="mt-4 text-5xl font-semibold text-[#164342] md:text-6xl">
                {ministerio.nome}
              </h1>

              <h2 className="mt-3 text-xl font-medium text-neutral-500 md:text-2xl">
                {ministerio.nome_completo}
              </h2>

              <div className="mt-6 h-[2px] w-14 bg-[#7F7C3F]" />

              {ministerio.descricao ? (
                <p className="mt-8 whitespace-pre-line text-base leading-8 text-neutral-600 md:text-lg">
                  {ministerio.descricao}
                </p>
              ) : (
                <p className="mt-8 text-base italic leading-8 text-neutral-400 md:text-lg">
                  Em breve mais informações sobre esta sociedade.
                </p>
              )}

              <a
                href={linkWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 bg-[#164342] px-7 py-3.5 font-semibold text-white transition duration-300 hover:bg-[#0F3433]"
              >
                Quero fazer parte
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ORIENTAÇÃO */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7F7C3F]">
              Liderança
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-[#164342]">
              Orientação e Conselho
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-t border-[#164342]/20 pt-6">
              <p className="text-sm uppercase tracking-widest text-neutral-400">
                Orientador
              </p>

              <p className="mt-2 text-xl font-semibold text-[#164342]">
                {ministerio.orientador || "Não informado"}
              </p>
            </div>

            <div className="border-t border-[#164342]/20 pt-6">
              <p className="text-sm uppercase tracking-widest text-neutral-400">
                Conselheiro
              </p>

              <p className="mt-2 text-xl font-semibold text-[#164342]">
                {ministerio.conselheiro || "Não informado"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIRETORIA */}
      <section className="bg-[#164342] py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5c078]">
              Gestão {ministerio.ano_diretoria}
            </p>

            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Diretoria
            </h2>
          </div>

          {diretoria.length > 0 ? (
            <div className="divide-y divide-white/15 border-y border-white/15">
              {diretoria.map((membro) => (
                <div
                  key={membro.id}
                  className="grid gap-2 py-6 sm:grid-cols-2 sm:items-center"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#c5c078]">
                    {membro.cargo}
                  </p>

                  <p className="text-lg font-medium">{membro.nome}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-y border-white/15 py-8">
              <p className="text-white/60">
                Diretoria ainda não cadastrada para {ministerio.ano_diretoria}.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
