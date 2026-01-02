import { lazy } from "react";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

import DashboardLayout from "@/routes/DashboardLayout";
import Dashboard from "@/routes/Dashboard";
import Lessons from "@/routes/Lessons";
import AddLesson from "@/routes/AddLesson";
import Lesson from "@/routes/Lesson";
import EditLesson from "@/routes/EditLesson";
import Settings from "@/routes/Settings";
const Orders = lazy(() => import("@/routes/Orders/orders"));
const Statistics = lazy(() => import("@/routes/statistics/Statistics"));
import Students from "@/routes/Students";
import Messages from "@/routes/Messages";

const Routes = () => {
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
          path: "orders",
          Component: Orders,
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
  return <RouterProvider router={router} />;
};

export default Routes;
