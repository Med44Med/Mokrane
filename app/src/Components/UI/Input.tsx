import { clsx } from "clsx";

const Input = ({
  value,
  required,
  onChange,
  name,
  type = "text",
  className,
  autoFocus,
  placeholder,
}: {
  value: string | number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
}) => {
  return (
    <input
      type={type}
      required={required && required}
      name={name}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      className={clsx(
        "px-3 py-2 bg-background text-sm text-text outline-none border border-solid border-text/10 rounded-lg focus:border-primary/50",
        className
      )}
      placeholder={placeholder}
      allowClear
    />
  );
};

export default Input;
