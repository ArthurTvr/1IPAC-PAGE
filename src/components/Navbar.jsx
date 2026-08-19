import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-ipac.png";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { nome: "Início", to: "/" },
    { nome: "Sobre", to: "/#sobre" },
    // { nome: "Cultos", to: "/#cultos" },
    { nome: "Mensagens", to: "/#mensagens" },
    { nome: "Sociedades Internas", to: "/#ministerios" },
    { nome: "Eventos", to: "/#eventos" },
    { nome: "Contato", to: "/#contato" },
  ];

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:h-22 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          onClick={fecharMenu}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="1ª Igreja Presbiteriana de Alto Caparaó"
            className="w-44 sm:w-52 lg:w-50"
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.nome}
              to={link.to}
              className="group relative text-sm font-medium text-neutral-700 transition-colors duration-300 hover:text-[#164342]"
            >
              {link.nome}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#7F7C3F] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          aria-label="Abrir menu"
        >
          <span
            className={`block h-[2px] w-6 bg-[#164342] transition-all duration-300 ${
              menuAberto ? "translate-y-[7px] rotate-45" : ""
            }`}
          />

          <span
            className={`block h-[2px] w-6 bg-[#164342] transition-all duration-300 ${
              menuAberto ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block h-[2px] w-6 bg-[#164342] transition-all duration-300 ${
              menuAberto ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 lg:hidden ${
          menuAberto ? "max-h-[500px] border-t" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-5">
          {links.map((link) => (
            <Link
              key={link.nome}
              to={link.to}
              onClick={fecharMenu}
              className="border-b border-neutral-100 py-4 font-medium text-neutral-700 transition hover:text-[#164342]"
            >
              {link.nome}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}