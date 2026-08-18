import { Link } from "react-router-dom";
import logoUCP from "../assets/images/logoucp.png";
import logoUMP from "../assets/images/logoump.png";
import logoUPA from "../assets/images/logoupa.png";
import logoSAF from "../assets/images/logosaf.png";
import logoUPH from "../assets/images/logouph.png";

const ministerios = [
  {
    nome: "Crianças (UCP)",
    slug: "ucp",
    imagem: logoUCP,
  },
  {
    nome: "Jovens (UMP)",
    slug: "ump",
    imagem: logoUMP,
  },
  {
    nome: "Adolescentes (UPA)",
    slug: "upa",
    imagem: logoUPA,
  },
  {
    nome: "Mulheres (SAF)",
    slug: "saf",
    imagem: logoSAF,
  },
  {
    nome: "Homens (UPH)",
    slug: "uph",
    imagem: logoUPH,
  },
];

export default function Ministerios() {
  return (
    <section id="ministerios" className="bg-[#164342] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">
            Sirva conosco
          </p>

          <h2 className="mt-3 text-4xl font-bold">Nossos Ministérios</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ministerios.map((ministerio) => (
            <Link
              key={ministerio.slug}
              to={`/ministerios/${ministerio.slug}`}
              className="group relative block h-[400px] overflow-hidden"
            >
              <img
                src={ministerio.imagem}
                alt={ministerio.nome}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-bold">{ministerio.nome}</h3>

                <p className="mt-2 text-sm text-white/70">
                  Conheça este ministério →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
