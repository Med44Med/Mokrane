;
import { Skeleton } from "@/Components/UI";

const DashboardLoading = () => {
  return (
    <>
      <Skeleton className="col-start-1 row-start-4 md:row-start-1" />
      <Skeleton className="col-start-1 row-start-5 md:col-start-1 md:row-start-2" />
      <Skeleton className="col-start-1 row-start-6 md:col-start-1 md:row-start-3" />
      <Skeleton className="row-span-3 col-start-1 row-start-1 md:col-span-2 md:row-span-3 md:col-start-2" />
    </>
  );
};

export default DashboardLoading;
