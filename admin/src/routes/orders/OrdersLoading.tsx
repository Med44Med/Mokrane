import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const OrdersLoading = () => {
  return (
    <>
      <Skeleton className="w-full h-32 mb-5" />
      <Skeleton className="w-full h-32 mb-5" />
      <Skeleton className="w-full h-32 mb-5" />
      <Skeleton className="w-full h-32 mb-5" />
    </>
  );
};

export default OrdersLoading;
