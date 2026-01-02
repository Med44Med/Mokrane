import React from "react";
import { Text, SubText } from '@/Components/Typo';
import { Price } from "@/utilis/Price";
import { Day } from "../../../../app/src/utilis/Day";
import supabase from "@/utilis/supabase";
import { useState } from "react";

const OrderRow = ({ row }) => {
  const [status, setStatus] = useState();
  const handleApproval = async () => {
    const { data, error } = await supabase
      .from("orders")
      .update({ status: "aprroved" })
      .eq("orderNo", row?.orderNo)
      .select("status");
    if (error) alert("Somthing went wrong!");
  };
  return (
    <tr className="group hover:bg-primary/10">
      <td className=" border-b border-text-secondary/20">
        <div className="p-2 flex flex-col justify-start items-center gap-1">
          <img
            src={row?.profiles.avatar}
            alt="profile"
            className="size-10 rounded-full"
          />
          <SubText className="line-clamp-1">
            {row?.profiles.lastname} {row?.profiles.firstname}
          </SubText>
        </div>
      </td>
      <td className="border-b border-text-secondary/20">
        <ul className="pr-5 p-3 list-decimal marker:text-text">
          {row?.items.map((u, index) => (
            <li key={index}>
              <SubText secondary className='group-hover:text-text'>
                {u?.title} -{" "}
                {u?.sale ? Price(u?.sale) + " بعد الخصم" : Price(u?.price)}
              </SubText>
            </li>
          ))}
        </ul>
      </td>
      <td className=" border-b border-text-secondary/20">
        <SubText className="text-center">{Day(row?.created_at)}</SubText>
      </td>
      <td className=" border-b border-text-secondary/20">
        <SubText className="text-center">{Price(row?.total)}</SubText>
      </td>
      <td className=" border-b border-text-secondary/20">
        <div className="flex justify-center">
          <SubText className="px-5 py-1 rounded-2xl text-center bg-orange-400/30 text-orange-400! font-bold!">
            غير مدفوع
          </SubText>
        </div>
      </td>
      <td className="border-b border-text-secondary/20">
        <div className="flex justify-center p-3">
          {row?.proof ? (
            <button>موافقة</button>
          ) : (
            <SubText className="px-5 py-1 rounded-2xl text-center bg-orange-400/30 text-orange-400! font-bold!">
              في انتظار الدفع
            </SubText>
          )}
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
