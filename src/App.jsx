import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cultos from "./components/Cultos";
import Sobre from "./components/Sobre";
import Programacao from "./components/Programacao";
import Mensagem from "./components/Mensagem";
import Ministerios from "./components/Ministerios";
import Eventos from "./components/Eventos";
import Localizacao from "./components/Localizacao";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Cultos />
        <Sobre />
        <Programacao />
        <Mensagem />
        <Ministerios />
        <Eventos />
        <Localizacao />
      </main>

      <Footer />
    </>
  );
}