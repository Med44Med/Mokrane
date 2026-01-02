import { clsx } from "clsx";

export const Text = ({
  children,
  className,
  secondary = false,
}: {
  children: React.ReactNode | string;
  className?: string;
  secondary?: boolean;
}) => {
  return (
    <p
      className={clsx(
        " text-base font-normal",
        secondary ? "text-text-secondary" : "text-text",
        className
      )}
    >
      {children}
    </p>
  );
};
export const SubText = ({
  children,
  className,
  secondary = false,
}: {
  children: React.ReactNode | string;
  className?: string;
  secondary?: boolean;
}) => {
  return (
    <p
      className={clsx(
        " text-sm font-normal",
        secondary ? "text-text-secondary" : "text-text",
        className
      )}
    >
      {children}
    </p>
  );
};

export const Heading = ({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode | string;
  className?: string;
  hover?: boolean;
}) => {
  return (
    <h1
      className={clsx(
        "text-text text-2xl font-bold ",
        hover && "hover:text-primary",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const SubHeading = ({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode | string;
  className?: string;
  hover?: boolean;
}) => {
  return (
    <h1
      className={clsx(
        "text-text text-xl font-bold",
        hover && "hover:text-primary",
        className
      )}
    >
      {children}
    </h1>
  );
};
