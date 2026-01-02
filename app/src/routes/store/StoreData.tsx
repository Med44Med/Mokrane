import StoreCard from "./StoreCard";
import { Surface } from "@/Components/UI";
import { Heading } from "@/Components/Typo";
import { TbMoodEmpty } from "react-icons/tb";
import type { BrochureType } from "@/types";

const StoreData = ({
  brochures,
  handleCartItem,
  cart,
}: {
  brochures: BrochureType[];
  handleCartItem: (item: BrochureType) => void;
  cart: BrochureType[];
}) => {
  return brochures.length === 0 ? (
    <Surface className="flex-1 w-full flex flex-col justify-center items-center mb-10">
      <TbMoodEmpty className="text-7xl text-primary mb-5" />
      <Heading className="text-text text-3xl font-semibold">
        لا يوجد دروس
      </Heading>
    </Surface>
  ) : (
    <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5 gap-y-3 md:gap-y-10 md:py-5 py-10">
      {brochures.map((l: BrochureType) => (
        <StoreCard
          key={l.id}
          l={l}
          handleCartItem={handleCartItem}
          cart={cart}
        />
      ))}
    </div>
  );
};

export default StoreData;
