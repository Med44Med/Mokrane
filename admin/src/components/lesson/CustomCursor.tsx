import React from "react";
import { clsx } from "clsx";

const CustomCursor = ({ pos, isHovered }) => {
  return (
    <div
      className={clsx(
        "fixed h-20 w-20 bg-primary/80 rounded-full pointer-events-none justify-center items-center [&.active]:scale-100   scale-50 duration-1000 delay-300 transition-transform ",
        isHovered && "active"
      )}
      style={{
        left: pos.x - 40,
        top: pos.y - 40,
        display: isHovered ? "flex" : "none",
        transition: "transform 0.05s",
      }}
    >
      <h1 className="text-white font-bold text-lg">تعديل</h1>
    </div>
  );
};

export default CustomCursor;
