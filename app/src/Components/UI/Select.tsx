;
import { clsx } from "clsx";

const Select = ({
  children,
  onChange,
  className,
}: {
  children: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) => {
  return (
    <select
      onChange={onChange}
      className={clsx(
        "px-5 py-1 bg-surface text-sm text-text outline-none border-2 border-solid border-text-secondary/10 rounded-xl focus:border-primary/50 ",
        className
      )}
    >
      {children}
    </select>
  );
};

const Option = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => {
  return (
    <option value={value} className="text-text bg-background text-right">
      {children}
    </option>
  );
};

Select.Option = Option;

const Optgroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <optgroup
      label={label}
      className="bg-background text-text-secondary text-sm text-right"
    >
      {children}
    </optgroup>
  );
};
Select.Optgroup = Optgroup;

export default Select;
