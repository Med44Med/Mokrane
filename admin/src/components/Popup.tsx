import { Activity } from "react";
import { clsx } from "clsx";

const Popup = ({ children, show, setShow, className }) => {
  return (
    <Activity mode={show ? "visible" : "hidden"}>
      <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setShow(false)}
        />
        <div
          className={clsx(
            "z-10 h-8/12 md:h-2/3 w-11/12 md:w-2/3 rounded-2xl bg-background p-5 overflow-y-auto overflow-x-hidden flex flex-col justify-start items-center",
            className
          )}
        >
          {children}
        </div>
      </div>
    </Activity>
  );
};

export default Popup;
