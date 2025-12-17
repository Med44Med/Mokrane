import Header from "../Components/UI/Header";
import { useEffect, useContext, useState, useRef } from "react";
import supabase from "../utilis/supabase";
import { AuthContext } from "../contexts/contexts.ts";
import { Price } from "../utilis/Price";
import Button from "../Components/UI/Button";

import { FaImage } from "react-icons/fa";
import OrdersRow from '../Components/UI/OrdersRow';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [proof, setProof] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      setError("");
      const { data, error } = await supabase.from("orders").select("*");
      // .eq("user", user?.id);

      if (error) {
        console.log("Error:", error);
        setLoading(false);
        return;
      }
      setOrders(data);
      setLoading(false);
    })();
  }, [user]);

  return (
    <>
      <Header title="الطلبات" />
      {loading ? (
        <h1 className="text-text font-bold text-2xl">Loading....</h1>
      ) : error ? (
        <h1 className="text-text font-bold text-2xl">{error}'</h1>
      ) : (
        <div className="bg-surface w-full flex-1 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-text/10">
              <tr>
                <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
                  الرقم
                </td>
                <td className="w-1/3 text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
                  الدروس
                </td>
                <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
                  السعر الإجمالي
                </td>
                <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
                  إثبات الدفع
                </td>
                <td className="text-xl text-text font-bold text-center py-2 border-b border-text-secondary/50">
                  الحالة
                </td>
              </tr>
            </thead>
            <tbody className="h-full ">
              {orders.map((e, index) => (
                <OrdersRow key={index} data={e} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;


