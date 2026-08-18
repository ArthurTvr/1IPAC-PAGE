import { Link } from "react-router-dom";
import templo from "../assets/images/templo.png";

export default function Sobre() {
  return (
    <section id="sobre" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden">
          <img
            src={templo}
            alt="Nossa igreja"
            className="h-[500px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#164342]">
            Quem somos
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Uma comunidade centrada no Evangelho
          </h2>

          <p className="mt-7 leading-8 text-neutral-600">
            Somos uma comunidade cristã comprometida com a Palavra de Deus, com
            a comunhão entre irmãos e com a proclamação do Evangelho.
          </p>

          <p className="mt-4 leading-8 text-neutral-600">
            Nosso desejo é que cada pessoa encontre um lugar para crescer na fé,
            servir ao próximo e desenvolver um relacionamento cada vez mais
            profundo com Deus.
          </p>

          <Link
            to="/historia"
            className="group mt-8 inline-flex items-center gap-3 font-semibold text-[#164342]"
          >
            Conheça nossa história
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
