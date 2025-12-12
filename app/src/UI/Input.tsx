import React from "react";
import { clsx } from "clsx";

const Input = ({
  value,
  onChange,
  name,
  type = "text",
  className,
  autoFocus,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      className={clsx(
        "px-3 py-1 text-sm outline-none border border-solid border-white/50 rounded focus:border-green-500/50",
        className
      )}
    />
  );
};

export default Input;
