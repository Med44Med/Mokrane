;
import { clsx } from "clsx";

const Button = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: (x?: unknown) => unknown;
  className: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "bg-primary px-10 py-2 rounded transition hover:bg-primary-hover text-white font-black text-base min-w-32 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
