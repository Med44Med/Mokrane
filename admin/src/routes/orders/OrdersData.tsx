import React from "react";
import { Surface, SubSurface } from "@/components/ui/Surface";
import { Text, SubText, SubHeading } from "@/Components/Typo";
import { Price } from "@/utilis/Price";
import { Day } from "../../../../app/src/utilis/Day";
import OrderRow from "./OrderRow";

const OrdersData = ({ data }) => {
  console.log(data);

  return (
    // <div className="flex-1 w-full">
    //   <Surface className="w-full overflow-x-auto">
    //     <table className="w-fit">
    //       <thead>
    //         <tr>
    //           <td className="text-nowrap  text-text text-xl font-bold py-4 border-b border-white/10 px-3 text-center">
    //             الاسم
    //           </td>
    //           <td className="text-nowrap min-w-1/2 text-text text-xl font-bold py-4 border-b border-white/10 px-3 text-center">
    //             الطلبيات
    //           </td>
    //           <td className="text-nowrap text-text text-xl font-bold py-4 px-3 border-b border-white/10 text-center">
    //             تاريخ الطلب
    //           </td>
    //           <td className="text-nowrap text-text text-xl font-bold py-4 border-b border-white/10 px-3 text-center">
    //             المجموع
    //           </td>
    //           <td className="text-nowrap text-text text-xl font-bold py-4 border-b border-white/10 px-3 text-center  ">
    //             إثبات الدفع
    //           </td>
    //           <td className="text-nowrap text-text text-xl font-bold py-4 px-3 border-b border-white/10 text-center">
    //             الحالة
    //           </td>
    //         </tr>
    //       </thead>
    //       <tbody className="overflow-y-auto">
    //         {data.map((l, index) => (
    //           <OrderRow key={index} row={l} />
    //         ))}
    //         {data.map((l, index) => (
    //           <OrderRow key={index} row={l} />
    //         ))}
    //         {data.map((l, index) => (
    //           <OrderRow key={index} row={l} />
    //         ))}
    //         {data.map((l, index) => (
    //           <OrderRow key={index} row={l} />
    //         ))}
    //       </tbody>
    //     </table>
    //   </Surface>
    // </div>
    <div className="flex-1 mt-5 flex flex-col gap-3">
      {data.map((l, index) => (
        <Surface
          key={index}
          className="p-3 flex flex-col justify-start items-start gap-1"
        >
          <div className="flex justify-center items-center gap-0.5">
            <SubText>{Day(l?.created_at)}</SubText>
          </div>
          <div className="pb-3 flex justify-center items-center gap-0.5">
            <img
              src={l?.profiles.avatar}
              alt="profile"
              className="size-6 rounded-full ml-1"
            />
            <SubHeading>{l?.profiles.lastname}</SubHeading>
            <SubHeading>{l?.profiles.firstname}</SubHeading>
          </div>
          <Text>رقم الطلب : {l?.orderNo}</Text>
          <ul className="pr-10 list-decimal marker:text-text">
            {l?.items.map((u, index) => (
              <li key={index}>
                <Text secondary>
                  {u?.title} -{" "}
                  {u?.sale ? Price(u?.sale) + " بعد الخصم" : Price(u?.price)}
                </Text>
              </li>
            ))}
          </ul>
          <div>
            <button>confirm</button>
          </div>
        </Surface>
      ))}
      {data.map((l, index) => (
        <Surface
          key={index}
          className="p-3 flex flex-col justify-start items-start gap-1"
        >
          <div className="flex justify-center items-center gap-0.5">
            <SubText>{Day(l?.created_at)}</SubText>
          </div>
          <div className="pb-3 flex justify-center items-center gap-0.5">
            <img
              src={l?.profiles.avatar}
              alt="profile"
              className="size-6 rounded-full ml-1"
            />
            <SubHeading>{l?.profiles.lastname}</SubHeading>
            <SubHeading>{l?.profiles.firstname}</SubHeading>
          </div>
          <Text>رقم الطلب : {l?.orderNo}</Text>
          <ul className="pr-10 list-decimal marker:text-text">
            {l?.items.map((u, index) => (
              <li key={index}>
                <Text secondary>
                  {u?.title} -{" "}
                  {u?.sale ? Price(u?.sale) + " بعد الخصم" : Price(u?.price)}
                </Text>
              </li>
            ))}
          </ul>
          <div>
            <button>confirm</button>
          </div>
        </Surface>
      ))}
      {data.map((l, index) => (
        <Surface
          key={index}
          className="p-3 flex flex-col justify-start items-start gap-1"
        >
          <div className="flex justify-center items-center gap-0.5">
            <SubText>{Day(l?.created_at)}</SubText>
          </div>
          <div className="pb-3 flex justify-center items-center gap-0.5">
            <img
              src={l?.profiles.avatar}
              alt="profile"
              className="size-6 rounded-full ml-1"
            />
            <SubHeading>{l?.profiles.lastname}</SubHeading>
            <SubHeading>{l?.profiles.firstname}</SubHeading>
          </div>
          <Text>رقم الطلب : {l?.orderNo}</Text>
          <ul className="pr-10 list-decimal marker:text-text">
            {l?.items.map((u, index) => (
              <li key={index}>
                <Text secondary>
                  {u?.title} -{" "}
                  {u?.sale ? Price(u?.sale) + " بعد الخصم" : Price(u?.price)}
                </Text>
              </li>
            ))}
          </ul>
          <div>
            <button>confirm</button>
          </div>
        </Surface>
      ))}
    </div>
  );
};

export default OrdersData;

{
  /* <div className="flex-1 w-full bg-surface overflow-x-auto rounded-xl">
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
      </div> */
}
