import { clsx } from "clsx";

export const Surface = ({
  children,
  className,
  onClick,
  dir,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  dir?: "ltr" | "rtl";
}) => {
  return (
    <div
      dir={dir}
      className={clsx(
        "bg-surface rounded-2xl border-l-2 border-t-2  border-surface-secondary shadow",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const SubSurface = ({
  children,
  className,
  onClick,
  dir,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  dir?: "ltr" | "rtl";
}) => {
  return (
    <div
      dir={dir}
      className={clsx(
        "bg-surface-secondary rounded-xl border-l-2 border-t-2 border-white/10 shadow",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

