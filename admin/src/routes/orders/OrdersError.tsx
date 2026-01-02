import React from "react";
import { SubHeading } from "@/Components/Typo";

const OrdersError = ({ error, retry }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3">
      <SubHeading>{error?.message}</SubHeading>
      <button className="text-white" onClick={retry}>
        Retry
      </button>
    </div>
  );
};

export default OrdersError;
