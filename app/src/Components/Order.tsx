;
import { Surface, SubSurface } from './UI';
import { SubText, Text, SubHeading } from './Typo';
import { Day } from "../utilis/Day";
import { Price } from '../utilis/Price';

const Order = ({ data }) => {
  console.log(data);

  return (
    <>
      <Surface className="mb-5 w-full p-4 flex">
        <div className="flex-1 flex justify-start items-start flex-col gap-2">
          <SubText>{Day(data?.created_at)}</SubText>
          <div className="flex flex-col gap-2">
            {data?.items.map((e, index) => (
              <li key={index} className="list-none text-text">
                <Text>{e.title} - {Price(e.price)}</Text>
              </li>
            ))}
          </div>
          <SubHeading>المجموع: {Price(data?.total)}</SubHeading>
        </div>
        <div className="h-full flex justify-center items-center">
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
      </Surface>
    </>
  );
};

export default Order;
