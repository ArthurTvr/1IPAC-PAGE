import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ScrollToTop from "./components/ScrollToTop";

import Historia from "./pages/Historia";
function Home() {
  return (
    <>
      <Hero />
      <Cultos />
      <Sobre />
      <Programacao />
      <Mensagem />
      <Ministerios />
      <Eventos />
      <Localizacao />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}