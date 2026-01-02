import Header from "@/Components/Header";
import DashboardMain from "./dashboard/DashboardMain";
import { Surface } from '@/components/ui/Surface';

const Dashboard = () => {
  return (
    <>
      <Header title="لوحة التحكم" />
      <div className="w-full flex-1 grid grid-cols-4 grid-rows-3 gap-5">
        <DashboardMain />
        <Surface></Surface>
        <Surface></Surface>
        <Surface></Surface>
        <Surface></Surface>
        <Surface></Surface>
        <Surface></Surface>
      </div>
    </>
  );
};

export default Dashboard;
