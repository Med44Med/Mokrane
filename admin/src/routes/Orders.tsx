import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import { useState } from "react";
import Loading from "../components/Spinner";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Helmet>
        <title>العقل المدبر | الطلبات</title>
      </Helmet>

      <Header title={"الطلبات"} />
      <div className="flex-1 w-full bg-surface overflow-x-auto rounded-xl">
        {loading ? (
          <Loading className="mt-32" />
        ) : (
          <table className="w-full bg-surface shadow  ">
            <thead>
              <tr>
                <td></td>
                <td className="text-nowrap text-text text-xl font-bold py-4 px-3 border-l border-b border-white/10 text-center">
                  تاريخ الطلب
                </td>
                <td className="text-nowrap w-1/3 text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  الاسم
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  الطلبات
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center">
                  المجموع
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 border-l border-b border-white/10 px-3 text-center  ">
                  إثبات الدفع
                </td>
                <td className="text-nowrap text-text text-xl font-bold py-4 px-3 border-b border-white/10 text-center">
                  الحالة
                </td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Orders;
