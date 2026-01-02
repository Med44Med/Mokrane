import { clsx } from "clsx";
import { Link } from "react-router";
import type { BrochureType } from "@/types.ts";
import { Price } from "@/utilis/Price";
import { Surface } from "@/Components/UI";
import { SubText, SubHeading } from "@/Components/Typo";
import { FaPlus, FaMinus } from "react-icons/fa";
import { classroom, branch } from '@/assets/constatns';

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

  const classRoom = classroom.find((c) => c.value === l.class)?.label;
  const branchName = branch.find((b) => b.value === l.branch)?.label;

  return (
    <Surface
      className={`
        "group h-fit hover:bg-primary/5 p-3  flex flex-col justify-start items-start gap-1 ",
        ${isSelected && "bg-primary/10!"}
        `}
    >
      <img
        src={l.thumbnail}
        alt={l.title}
        className="w-full aspect-video object-center object-cover mb-3 text-text bg-background rounded-xl"
        loading="lazy"
      />
      <div className="w-full flex flex-col gap-1">
        <SubText>{classRoom + " - " + branchName}</SubText>
        <SubHeading className="line-clamp-1 mb-1">
          {l.title}
        </SubHeading>
        <div className="h-[4lh]">
          <SubText className="line-clamp-3 mb-1">
            {l.description}
          </SubText>
          <Link
            to={`/store/${l.title}`}
            className="self-start text-sm font-bold text-primary mb-5"
          >
            اقرأ المزيد
          </Link>
        </div>
      </div>
      <div className="z-10 w-full  flex justify-between items-end mt-auto">
        <div className="flex gap-2">
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
        <button
          onClick={() => handleCartItem(l)}
          className="size-10 bg-primary hover:bg-primary-hover rounded-full flex justify-center items-center cursor-pointer"
        >
          {isSelected ? (
            <FaMinus className="text-lg text-white" />
          ) : (
            <FaPlus className="text-lg text-white" />
          )}
        </button>
      </div>
    </Surface>
  );
};

export default StoreCard;
