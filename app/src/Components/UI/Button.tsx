import { clsx } from "clsx";

const Button = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className: string;
  onClick: (x?: unknown) => unknown;
}) => {
  return (
    <button
      className={clsx(
        "bg-primary px-10 py-2 rounded transition hover:bg-primary-hover text-white font-black text-base min-w-32 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
