import Header from "@/Components/Header";
import { useEffect, useContext, useState } from "react";
import supabase from "../utilis/supabase";
import { AuthContext } from "../contexts/contexts.ts";

import { Heading, Text } from "../Components/Typo";
import Order from "@/Components/Order";
import { Surface } from "@/Components/UI";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      setError("");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user", user?.id);

      if (error) {
        console.log("Error:", error);
        setLoading(false);
        return;
      }
      setOrders(data);
      setLoading(false);
    })();
  }, [user]);

  console.log(orders);

  return (
    <>
      <Header title="الطلبات" />
      {loading ? (
        <Surface className="w-full py-20 flex justify-center items-center">
          <Heading >يرجى الانتظار لحظة...</Heading>
        </Surface>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        // <div className="bg-surface w-full flex-1 rounded-2xl overflow-hidden">
        //   <table className="w-full">
        //     <thead className="bg-text/10">
        //       <tr>
        //         <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
        //           الرقم
        //         </td>
        //         <td className="w-1/3 text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
        //           الدروس
        //         </td>
        //         <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
        //           السعر الإجمالي
        //         </td>
        //         <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
        //           إثبات الدفع
        //         </td>
        //         <td className="text-xl text-text font-bold text-center py-2 border-b border-text-secondary/50">
        //           الحالة
        //         </td>
        //       </tr>
        //     </thead>
        //     <tbody className="h-full ">
        //       {orders.map((e, index) => (
        //         <OrdersRow key={index} data={e} index={index} />
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <>
          {orders.map((e, index) => (
            <Order key={index} data={e} />
          ))}
        </>
      )}
    </>
  );
};

export default Orders;
