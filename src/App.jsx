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
import AdminRoute from "./components/AdminRoute";
import Ministerio from "./pages/Ministerio";
import Historia from "./pages/Historia";

import Admin from "./pages/admin/Admin";
import Login from "./pages/admin/Login";
import MensagensAdmin from "./pages/admin/MensagensAdmin";
import EventosAdmin from "./pages/admin/EventosAdmin";
import MinisteriosAdmin from "./pages/admin/MinisteriosAdmin";

function Home() {
  return (
    <>
      <Hero />
      {/* <Cultos /> */}
      <Sobre />
      <Programacao />
      <Mensagem />
      <Ministerios />
      <Eventos />
      <Localizacao />
    </>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* SITE PÚBLICO */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/historia"
          element={
            <PublicLayout>
              <Historia />
            </PublicLayout>
          }
        />
        <Route
          path="/ministerios/:slug"
          element={
            <PublicLayout>
              <Ministerio />
            </PublicLayout>
          }
        />

        {/* LOGIN ADMIN */}
        <Route path="/admin/login" element={<Login />} />

        {/* PAINEL ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        
        <Route
          path="/admin/ministerios"
          element={
            <AdminRoute>
              <MinisteriosAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/mensagens"
          element={
            <AdminRoute>
              <MensagensAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/eventos"
          element={
            <AdminRoute>
              <EventosAdmin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
