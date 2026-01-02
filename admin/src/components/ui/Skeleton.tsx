import { clsx } from 'clsx';
export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "bg-surface rounded-2xl border-l-2 border-t-2  border-surface-secondary shadow animate-pulse",
        className
      )}
    />
  );
};
