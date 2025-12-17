import { useRef, useEffect, useState, Activity } from "react";
import supabase from "../../utilis/supabase";
import { Price } from "../../utilis/Price";
import { FaImage } from "react-icons/fa";
import Button from "./Button";
import Popup from "./Popup";

const OrdersRow = ({ data, index, proof, setProof }) => {
  const [showProof, setShowProof] = useState(false);
  const proofRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      if (!proof) {
        return;
      }
      const {
        data: { path },
        error,
      } = await supabase.storage
        .from("proof")
        .upload(`${data.user}/${data.orderNo}`, proof);

      if (error) {
        console.log(error);
        setProof(null);
        return;
      }

      const {
        data: { publicUrl },
      } = await supabase.storage.from("proof").getPublicUrl(path);

      const { error: updateOrder } = await supabase
        .from("orders")
        .update({ proof: publicUrl })
        .eq("id", data?.id);
      if (updateOrder) {
        console.log(updateOrder);
        setProof(null);
        return;
      }

      setProof(null);
    })();
  }, [data, proof]);

  return (
    <>
      <tr className="">
        <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
          {index + 1}
        </td>
        <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
          <div>
            {data?.items.map((e, index) => (
              <li key={index} className="list-none text-text">
                {e.title}
              </li>
            ))}
          </div>
        </td>
        <td className="text-xl text-text font-bold text-center py-2 border-b border-l border-text-secondary/50">
          {Price(data?.total)}
        </td>
        <td className="text-xl text-text font-bold text-center py-2 px-3 border-b border-l border-text-secondary/50">
          <div className="w-full flex justify-center items-center">
            {data?.proof ? (
              <FaImage
                className="text-text hover:text-primary text-5xl text-center cursor-pointer"
                onClick={() => setShowProof(true)}
              />
            ) : (
              <>
                <Button onClick={() => proofRef.current.click()}>
                  <h1 className="text-sm font-bold">قم بتحميل إثبات الدفع</h1>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={proofRef}
                  onChange={(e) => setProof(e.target.files[0])}
                  className="hidden"
                />
              </>
            )}
          </div>
        </td>
        <td className="text-xl text-text font-bold text-center py-2 border-b border-text-secondary/50">
          <div className="w-full flex justify-center items-center">
            {data?.proof ? (
              data?.approved ? (
                <h1 className="text-sm bg-primary rounded-2xl px-3 py-1">
                  تم الاتفاق
                </h1>
              ) : (
                <h1 className="text-sm bg-amber-300/80 rounded-2xl px-3 py-1">
                  قيد الموافقة
                </h1>
              )
            ) : (
              <h1 className="text-sm bg-amber-300/80 rounded-2xl px-3 py-1">
                في انتظار إثبات الدفع
              </h1>
            )}
          </div>
        </td>
      </tr>
      <Popup show={showProof} setShow={setShowProof}>
        <img src={data?.proof} alt="" classname="w-full aspect-video" loading="lazy" />
      </Popup>
    </>
  );
};

export default OrdersRow;
