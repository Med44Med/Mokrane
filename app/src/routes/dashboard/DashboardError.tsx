;
import { Surface } from "@/Components/UI";
import { SubHeading } from "@/Components/Typo";
import Button from "@/Components/UI/Button";

const DashboardError = ({ error, retry }) => {
  return (
    <Surface className="col-span-3 row-span-3 flex flex-col justify-center items-center gap-5">
      <SubHeading>{error}</SubHeading>
      <Button onClick={() => retry()}>إعادة المحاولة</Button>
    </Surface>
  );
};

export default DashboardError;
