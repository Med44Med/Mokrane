import { useState, useEffect } from "react";
import type { UserType } from "../types.ts";
import { AuthContext } from "./contexts.ts";
import supabase from "../utilis/supabase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();


      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", session.user.id)
          .single();
        if (error) {
          console.log(error);
          return;
        }
        setUser(data);
        return;
      } else {
        const {
          data: { user },
          error: loginErr,
        } = await supabase.auth.signInWithPassword({
          email: "mstgci4@gmail.com",
          password: "alpha44",
        });

        if (loginErr) {
          console.log("Login error:", loginErr.message);
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();
        if (error) {
          console.log(error);
          return;
        }
        setUser(data);
      }
    })();
  }, []);

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
      return;
    }
    setUser(null);
    window.location.href = "https://www.mokrane.xyz";
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
