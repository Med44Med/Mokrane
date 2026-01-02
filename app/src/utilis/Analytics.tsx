import { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/contexts";
import { UAParser } from "ua-parser-js";
import supabase, { analyticsSupabase } from "@/utilis/supabase";
import type { AuthContextType } from "../contexts/contexts";

const Analytics = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext<AuthContextType | null>(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { user } = auth;
  const id = user?.id;
  const { os } = UAParser();

  useEffect(() => {
    if (!id) return;

    const createSession = async () => {
      const existing = sessionStorage.getItem("session");
      if (existing) return;

      const { data, error } = await supabase
        .from("analytics")
        .insert([
          {
            user: id,
            os: os.name,
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Create session error:", error.message);
        return;
      }

      sessionStorage.setItem("session", JSON.stringify(data));
    };

    const closeSession = async () => {
      const raw = sessionStorage.getItem("session");
      if (!raw) return;

      const { id: sessionId } = JSON.parse(raw);

      const { error } = await analyticsSupabase
        .from("analytics")
        .update({ ended_at: new Date().toISOString() })
        .eq("id", sessionId)
        .eq("user", id)
        .eq("ended_at", null);

      if (error) {
        console.error("Close session error:", error.message);
        return;
      }

      sessionStorage.removeItem("session");
    };

    createSession();

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        closeSession();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [id, os]);

  return children;
};

export default Analytics;
