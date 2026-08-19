import { Link } from "react-router-dom";
import logoArthur from "../assets/images/logo-arthur.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* IGREJA */}
          <div>
            <h2 className="text-xl font-bold">
              1ª Igreja Presbiteriana de Alto Caparaó
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Uma comunidade comprometida com a Palavra de Deus, a comunhão e a
              proclamação do Evangelho.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold">Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link to="/" className="transition hover:text-white">
                Início
              </Link>

              <Link to="/#sobre" className="transition hover:text-white">
                Sobre
              </Link>

              {/* <Link to="/#cultos" className="transition hover:text-white">
                Cultos
              </Link> */}

              <Link to="/#mensagens" className="transition hover:text-white">
                Mensagens
              </Link>

              <Link to="/#ministerios" className="transition hover:text-white">
                Ministérios
              </Link>

              <Link to="/#eventos" className="transition hover:text-white">
                Eventos
              </Link>

              <Link to="/#contato" className="transition hover:text-white">
                Contato
              </Link>
            </div>
          </div>

          {/* REDES SOCIAIS */}
          <div>
            <h3 className="font-semibold">Redes sociais</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <a
                href="https://www.instagram.com/ipbaltocaparao?igsh=MXM1YTQwcW9ibWV5dA=="
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="https://www.youtube.com/@1ipac"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* DIREITOS */}
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} 1ª Igreja Presbiteriana de Alto
              Caparaó. Todos os direitos reservados.
            </p>

            {/* DESENVOLVIDO POR */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">Desenvolvido por</span>

              <a
                href="https://curriculoarthurtavares.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Acessar site de Arthur Tavares"
              >
                <img
                  src={logoArthur}
                  alt="Arthur Tavares"
                  className="h-10 w-auto opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
