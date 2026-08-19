import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      return;
    }

    const id = hash.replace("#", "");

    let tentativas = 0;
    const maxTentativas = 30;

    const procurarElemento = setInterval(() => {
      const elemento = document.getElementById(id);

      if (elemento) {
        clearInterval(procurarElemento);

        elemento.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return;
      }

      tentativas += 1;

      if (tentativas >= maxTentativas) {
        clearInterval(procurarElemento);
      }
    }, 100);

    return () => {
      clearInterval(procurarElemento);
    };
  }, [pathname, hash]);

  return null;
}