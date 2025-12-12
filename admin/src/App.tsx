import { useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AuthProvider from "./contexts/AuthContext";
import MessagesProvider from "./contexts/MessagesContext";

import DashboardLayout from "./routes/DashboardLayout";
import Dashboard from "./routes/Dashboard";
import Lessons from "./routes/Lessons";
import AddLesson from "./routes/AddLesson";
import Lesson from "./routes/Lesson";
import EditLesson from "./routes/EditLesson";
import Settings from "./routes/Settings";
import Orders from "./routes/Orders";
import Statistics from "./routes/Statistics";
import Students from "./routes/Students";
import Messages from "./routes/Messages";

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

  const router = createBrowserRouter([
    {
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: Dashboard,
        },
        {
          path: "statistics",
          Component: Statistics,
        },
        {
          path: "lessons",
          Component: Lessons,
        },
        {
          path: "lessons/:title",
          Component: Lesson,
        },
        {
          path: "lessons/add",
          Component: AddLesson,
        },
        {
          path: "lessons/edit",
          Component: EditLesson,
        },
        {
          path: "orders",
          Component: Orders,
        },
        {
          path: "messages",
          Component: Messages,
        },
        {
          path: "students",
          Component: Students,
        },
        {
          path: "settings",
          Component: Settings,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <MessagesProvider>
        <RouterProvider router={router} />
      </MessagesProvider>
    </AuthProvider>
  );
}

export default App;
