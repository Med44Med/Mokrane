import { Outlet } from "react-router";

import ConnectionStatus from "../components/ConnectionStatus";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
    <>
      <ConnectionStatus />
      <Aside />
      <main
        dir="rtl"
        className="pr-8 md:pr-72 pl-8 flex flex-col justify-start gap-3 min-h-dvh w-screen bg-background overflow-x-hidden"
      >
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
