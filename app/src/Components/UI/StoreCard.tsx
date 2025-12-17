import { clsx } from "clsx";
import { Link } from "react-router";
import Button from "./Button";
import { Price } from "../../utilis/Price";
import type { BrochureType } from "../../types.ts";

const StoreCard = ({
  l,
  handleCartItem,
  cart,
}: {
  l: BrochureType;
  handleCartItem: (item: BrochureType) => void;
  cart: BrochureType[];
}) => {
  const isSelected = cart.find((i: BrochureType) => i.id === l.id);
  return (
    <div
      className={clsx(
        "group w-full min-w-96 h-fit bg-surface hover:bg-primary/10 shadow p-5 rounded-2xl flex flex-col justify-start items-start gap-1 border-2",
        isSelected ? "border-green-500/60" : "border-transparent"
      )}
    >
      <img
        src={l.thumbnail}
        alt={l.title}
        className="w-full aspect-video object-center object-cover rounded mb-3 text-white"
      />
      <div className="w-full flex flex-col gap-1 h-44">
        <h1 className="text-xl text-white font-bold line-clamp-1 mb-1">
          {l.title}
        </h1>
        <p className="text-sm text-white/60 line-clamp-3 mb-1">
          {l.description}
        </p>
        <Link
          to={`/store/${l.title}`}
          className="self-start text-sm text-green-500 mb-10"
        >
          اقرأ المزيد
        </Link>
      </div>
      <div className="z-10 w-full  flex justify-between items-end mt-auto">
        <div className="flex flex-col">
          <h1
            className={clsx(
              "font-bold",
              l?.sale !== 0
                ? "text-text-secondary text-base line-through decoration-primary"
                : "text-primary text-lg"
            )}
          >
            {Price(l.price)}
          </h1>
          {l?.sale !== 0 && (
            <h1 className="text-lg text-green-500 font-bold">
              {Price(l.sale)}
            </h1>
          )}
        </div>
        <Button onClick={() => handleCartItem(l)}>
          <h1 className="text-white">
            {isSelected ? "إزالة من السلة" : "إضافة إلى السلة"}
          </h1>
        </Button>
      </div>
    </div>
  );
};

export default StoreCard;
