import { useEffect, Suspense } from "react";

import AuthProvider from "./contexts/AuthContext";
import MessagesProvider from "./contexts/MessagesContext";

import Routes from "@/routes/Routes";
import { SubHeading } from '@/Components/Typo';

function App() {
  useEffect(() => {
    const html = document.querySelector("html");
    const theme = localStorage.getItem("theme");
    if (theme) {
      html.setAttribute("theme", theme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (prefersDarkScheme) {
        html.setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.setAttribute("theme", "light");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="bg-background w-full h-dvh flex justify-center items-center">
          <SubHeading className="text-primary!">انتظر من فضلك...</SubHeading>
        </div>
      }
    >
      <AuthProvider>
        <MessagesProvider>
          <Routes />
        </MessagesProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
