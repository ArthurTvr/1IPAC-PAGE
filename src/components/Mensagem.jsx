import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Mensagem() {
  const [mensagem, setMensagem] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarUltimaMensagem();
  }, []);

  async function carregarUltimaMensagem() {
    setCarregando(true);

    const { data, error } = await supabase
      .from("mensagens")
      .select("*")
      .eq("ativo", true)
      .order("data", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar última mensagem:", error);
      setCarregando(false);
      return;
    }

    setMensagem(data);
    setCarregando(false);
  }

  function obterVideoId(url) {
    if (!url) return null;

    try {
      const urlObj = new URL(url);

      // youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes("youtube.com")) {
        if (urlObj.pathname === "/watch") {
          return urlObj.searchParams.get("v");
        }

        // youtube.com/embed/VIDEO_ID
        if (urlObj.pathname.startsWith("/embed/")) {
          return urlObj.pathname.split("/embed/")[1];
        }

        // youtube.com/shorts/VIDEO_ID
        if (urlObj.pathname.startsWith("/shorts/")) {
          return urlObj.pathname.split("/shorts/")[1];
        }

        // youtube.com/live/VIDEO_ID
        if (urlObj.pathname.startsWith("/live/")) {
          return urlObj.pathname.split("/live/")[1];
        }
      }

      // youtu.be/VIDEO_ID
      if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.replace("/", "");
      }
    } catch (error) {
      console.error("Link do YouTube inválido:", error);
    }

    return null;
  }

  function formatarData(data) {
    if (!data) return "";

    const dataFormatada = new Date(`${data}T00:00:00`);

    const diaSemana = dataFormatada.toLocaleDateString("pt-BR", {
      weekday: "long",
    });

    const diaMes = dataFormatada.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });

    return `${
      diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
    } • ${diaMes}`;
  }

  if (carregando) {
    return null;
  }

  if (!mensagem) {
    return null;
  }

  const videoId = obterVideoId(mensagem.video_url);
  const videoEmbed = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : "";

  return (
    <section id="mensagens" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#174c36]">
            Palavra
          </p>

          <h2 className="mt-3 text-4xl font-bold">Última mensagem</h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-sm bg-neutral-900 shadow-lg">
            <iframe
              className="h-full w-full"
              src={videoEmbed}
              title={mensagem.titulo}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div>
            <p className="text-sm font-medium text-[#174c36]">
              {formatarData(mensagem.data)}
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {mensagem.titulo}
            </h3>

            <p className="mt-4 text-neutral-500">
              {mensagem.pregador}
            </p>

            <p className="mt-6 leading-7 text-neutral-600">
              Assista à última mensagem ministrada em nossa igreja e acompanhe
              nossos cultos e estudos bíblicos.
            </p>

            <a
              href="https://www.youtube.com/@1ipac"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 bg-[#164342] px-7 py-3 font-semibold text-white transition duration-300 hover:bg-[#0f3433]"
            >
              Ver todas as mensagens
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}