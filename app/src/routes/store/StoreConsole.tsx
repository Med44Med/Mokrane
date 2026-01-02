import Header from "@/Components/Header";
import Input from "@/Components/UI/Input";
import Select from "@/Components/UI/Select";
import { TiThMenu } from "react-icons/ti";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { branch, classroom } from "../../assets/constatns";
import { clsx } from "clsx";

const StoreConsole = ({
  search,
  setSearch,
  handleParams,
  displayList,
  setDisplayList,
}:{
  search: string;
  setSearch: (s: string) => void;
  handleParams: (p: {class?:string; branch?:string; sort?:string}) => void;
  displayList: boolean;
  setDisplayList: (b: boolean) => void;
}) => {
  return (
    <>
      <Header title="المتجر" />
      <div className="w-full mb-0 md:mb-10 flex flex-col md:flex-row justify-between items-center gap-5">
        <Input
          autoFocus
          type="text"
          placeholder="بحث..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <div className="w-full md:w-auto flex justify-center items-center gap-5">
          <Select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
              const parsed = JSON.parse(e.target.value);
              handleParams({
                class: parsed.class,
                branch: parsed.branch,
              });
            }}
            className="w-full md:w-auto"
          >
            {classroom.map((c) => (
              <Select.Optgroup label={c.label} key={c.value}>
                {branch.map((e, index) => (
                  <Select.Option
                    key={index}
                    value={JSON.stringify({ class: c.value, branch: e.value })}
                  >
                    {e.label}
                  </Select.Option>
                ))}
              </Select.Optgroup>
            ))}
          </Select>
          <Select
            className="w-full md:w-auto"
            onChange={(e) => handleParams({ sort: e.target.value })}
          >
            <Select.Option value="popular">الأكثر شعبية</Select.Option>
            <Select.Option value="rated">الأكثر تقييما</Select.Option>
            <Select.Option value="demand">الأكثر طلبا</Select.Option>
            <Select.Option value="asc">السعر تصاعديًا</Select.Option>
            <Select.Option value="dsc">السعر التنازلي</Select.Option>
          </Select>
          <div className="hidden md:flex justify-center items-center gap-3">
            <TiThMenu
              onClick={() => setDisplayList(true)}
              className={clsx(
                "text-2xl cursor-pointer transition hover:text-green-500",
                displayList ? "text-green-500" : "text-white"
              )}
            />
            <BsGrid3X3GapFill
              onClick={() => setDisplayList(false)}
              className={clsx(
                "text-2xl cursor-pointer transition hover:text-green-500",
                !displayList ? "text-green-500" : "text-white"
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreConsole;
