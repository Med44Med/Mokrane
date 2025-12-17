import { Outlet } from "react-router";
import Aside from "../Components/Aside";
import Navbar from '../Components/Navbar';

const DashboardLayout = () => {
  return (
    <main
      dir="rtl"
      className="flex h-dvh md:h-screen w-screen bg-background p-0 m-0"
    >
      <Aside />
      <Navbar />
      <div className="flex-1 flex flex-col justify-start overflow-y-auto p-3 md:p-10 pb-24 md:pb-10 ">
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
