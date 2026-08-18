import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminRoute({ children }) {
  const [session, setSession] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setCarregando(false);
    }

    carregarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCarregando(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f0]">
        <p className="text-sm text-neutral-500">
          Carregando...
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}