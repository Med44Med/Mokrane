import { Outlet } from "react-router";

// import ConnectionStatus from "../components/ConnectionStatus";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
     <main dir="rtl" className="h-screen w-full bg-background p-0 m-0">
      <Aside />
      {/* <Navbar /> */}
      <div className="w-full h-full overflow-y-auto">
        <div className="min-h-screen p-3 md:p-10 pb-24 md:pb-10 mr-0 md:mr-64 flex flex-col justify-start ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
