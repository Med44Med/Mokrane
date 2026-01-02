import { MdErrorOutline } from "react-icons/md";
import { Surface } from "@/Components/UI";
import { SubHeading, Text } from "@/Components/Typo";
import Button from "@/Components/UI/Button";

const StoreError = ({ error, retry }: { error: string; retry: () => void }) => {
  return (
    <Surface className="flex-1 mb-10 flex flex-col justify-center items-center gap-3">
      <MdErrorOutline className="text-primary text-7xl" />
      <SubHeading>حدث خطأ ما</SubHeading>
      <Text className="mb-5">{error}</Text>
      <Button onClick={retry}>إعادة المحاولة</Button>
    </Surface>
  );
};

export default StoreError;
