import { useEffect } from "react";

export default function EventoModal({ evento, onClose }) {
  useEffect(() => {
    if (!evento) return;

    document.body.style.overflow = "hidden";

    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [evento, onClose]);

  if (!evento) return null;

  function formatarData(data) {
    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatarHorario(horario) {
    if (!horario) return null;

    return horario.slice(0, 5);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-white p-7 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* FECHAR */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-2xl text-neutral-400 transition hover:text-[#164342]"
        >
          ×
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7F7C3F]">
          Evento
        </p>

        <h2 className="mt-3 pr-10 text-3xl font-bold text-[#164342]">
          {evento.titulo}
        </h2>

        <div className="mt-6 h-[2px] w-12 bg-[#7F7C3F]" />

        <div className="mt-7 space-y-3 text-sm text-neutral-500">
          <p>
            <strong className="font-semibold text-neutral-700">
              Data:
            </strong>{" "}
            {formatarData(evento.data)}
          </p>

          {evento.horario && (
            <p>
              <strong className="font-semibold text-neutral-700">
                Horário:
              </strong>{" "}
              {formatarHorario(evento.horario)}
            </p>
          )}

          <p>
            <strong className="font-semibold text-neutral-700">
              Local:
            </strong>{" "}
            {evento.local}
          </p>
        </div>

        {evento.descricao && (
          <div className="mt-8 border-t border-neutral-100 pt-7">
            <p className="whitespace-pre-line leading-7 text-neutral-600">
              {evento.descricao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}