import React from "react";
import { Surface } from "@/components/ui/Surface";
import Header from "@/Components/Header";
import { Link } from "react-router";
import { Text } from "@/Components/Typo";

const DashboardMain = () => {
  return (
    <Surface className="col-span-3 row-span-2 p-5 flex flex-col">
      <Header title="التحليلات" />
      <div className="flex-1 pb-3 flex justify-between items-center gap-5">
        {/* <SubSurface className='flex-1 h-full p-3'></SubSurface>
        <SubSurface className='flex-1 h-full p-3'></SubSurface>
        <SubSurface className='flex-1 h-full p-3'></SubSurface> */}
        {/* <LineChart labels={["Jan","Feb","Mar"]} data={[120,450,300]} /> */}
      </div>
      <Link to='/statistics' className="mt-auto mr-auto">
        <Text>المزيد</Text>
      </Link>
    </Surface>
  );
};

export default DashboardMain;
