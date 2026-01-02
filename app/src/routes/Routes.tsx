import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import DashboardLayout from './DashboardLayout';
const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const ClassRooms = lazy(() => import("./ClassRooms"));
const Class = lazy(() => import("./Class"));
// const Messages = lazy(()=> import("./Messages"));
const Settings = lazy(() => import("./settings/Settings"));
const Profile = lazy(() => import("./profile/Profile"));
const Lessons = lazy(() => import("./lessons/Lessons.tsx"));
const Store = lazy(() => import("./store/Store.tsx"));
const Cart = lazy(() => import("./Cart"));
const Orders = lazy(() => import("./Orders"));
const Brochure = lazy(() => import("./Brochure"));
const Lesson = lazy(() => import("./Lesson"));
import NotFound from "./notFound";
// import { ErrorBoundary } from '../ErrorBoundary';

const Routes = () => {
  

  const router = createBrowserRouter([
    {
      Component: DashboardLayout,
      children: [
        {
          index: true,
          Component: Dashboard
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
        {
          path: "lessons/:title",
          loader: async ({ params }) => {
            return { title: params.title };
          },
          Component: Lesson,
        },
        // {
        //   path: "messages",
        //   Component: Messages,
        // },
        {
          path: "store",
          Component: Store,
          // errorElement: ErrorBoundary,
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
          path: "orders",
          Component: Orders,
        },
        {
          path: "settings",
          Component: Settings,
        },
        {
          path: "profile",
          Component: Profile,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
