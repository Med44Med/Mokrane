;
import { ImSpinner8 } from "react-icons/im";
import { Surface } from "@/Components/UI";
import { SubHeading } from "@/Components/Typo";

const StoreLoading = () => {
  return (
    <Surface className="flex-1 mb-10 flex flex-col justify-center items-center gap-5">
      <ImSpinner8 className="text-green-500 animate-spin text-5xl" />
      <SubHeading>انتظر من فضلك...</SubHeading>
    </Surface>
  );
};

export default StoreLoading;
