import { clsx } from "clsx";
import { FaFilter } from "react-icons/fa";
const LessonsFilter = ({ show, setShow, filter, setFilter }) => {
  return (
    <div
       className={clsx(
        "group z-50 absolute left-0 top-0 h-full w-full transition-opacity duration-300",
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className="absolute inset-0  transition ease-out backdrop-blur-sm bg-black/50"
        onClick={() => setShow(false)}
      />
      <div
        className={clsx(
          "z-10 absolute bg-background top-0 left-0 w-3/4 md:w-1/3 h-full transition p-5 flex flex-col duration-300 delay-300",
          show ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="">سنة دراسية :</label>
          <select name="" id="">
            <option value="">1AM</option>
            <option value="">2AM</option>
            <option value="">3AM</option>
          </select>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 transition px-10 py-2 rounded mt-auto flex gap-3 items-center justify-center cursor-pointer">
          <h1 className="text-white text-lg font-semibold">تصفية</h1>
          <FaFilter className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default LessonsFilter;
