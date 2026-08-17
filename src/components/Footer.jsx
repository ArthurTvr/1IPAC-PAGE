export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold">
                PRIMEIRA IGREJA PRESBITERIANA DE ALTO CAPARAÓ
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Uma comunidade comprometida com a Palavra de Deus, a comunhão e
              a proclamação do Evangelho.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <a href="#sobre">Sobre</a>
              <a href="#cultos">Cultos</a>
              <a href="#mensagens">Mensagens</a>
              <a href="#ministerios">Ministérios</a>
              <a href="#eventos">Eventos</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Redes sociais</h3>

            <div className="mt-4 flex gap-5 text-sm text-white/60">
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7 text-sm text-white/40">
          © {new Date().getFullYear()} PRIMEIRA IGREJA PRESBITERIANA DE ALTO CAPARAÓ. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}