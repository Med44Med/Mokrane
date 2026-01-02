import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  onIntersect: () => void,
  disabled?: boolean
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { rootMargin: "300px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, disabled]);

  return ref;
}
