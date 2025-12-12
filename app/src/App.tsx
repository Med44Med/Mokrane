import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import DashboardLayout from "./routes/DashboardLayout";
import Dashboard from "./routes/Dashboard";
import ClassRooms from "./routes/ClassRooms";
import Class from "./routes/Class";
// import Messages from "./routes/Messages";
import Settings from "./routes/Settings";
import Lessons from "./routes/Lessons";
import NotFound from "./routes/notFound";
import Store from "./routes/Store";
import Cart from "./routes/Cart";

import "./App.css";
import CartProvider from "./contexts/CartContext";
import AuthProvider from "./contexts/AuthContext";
import Brochure from "./routes/Brochure";

function App() {
  const router = createBrowserRouter([
    {
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: Dashboard,
        },
        {
          path: "classrooms",
          Component: ClassRooms,
        },
        {
          path: "classrooms/:id",
          loader: async ({ params }) => {
            return { id: params.id, title: "Sample Class Title" };
          },
          Component: Class,
        },
        {
          path: "lessons",
          Component: Lessons,
        },
        // {
        //   path: "messages",
        //   Component: Messages,
        // },
        {
          path: "store",
          Component: Store,
        },
        {
          path: "store",
          Component: Store,
        },
        {
          path: "store/:title",
          Component: Brochure,
        },
        {
          path: "store/cart",
          Component: Cart,
        },
        {
          path: "settings",
          Component: Settings,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
