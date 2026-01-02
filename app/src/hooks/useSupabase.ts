import { useCallback, useRef, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/utilis/supabase";

type UseSupabaseOptions = {
  table: string;
  select?: string;
  pageSize?: number;
  orderBy?: { column: string; ascending?: boolean };
  filters?: (query: unknown) => unknown;
  retry?: number;
  retryDelay?: number;
};

export function useSupabase<T>({
  table,
  select = "*",
  pageSize = 20,
  orderBy = { column: "created_at", ascending: false },
  filters,
}: UseSupabaseOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from(table)
        .select(select)
        .order(orderBy.column, { ascending: orderBy.ascending })
        .range(
          pageRef.current * pageSize,
          pageRef.current * pageSize + pageSize - 1
        );

      if (filters) {
        query = filters(query);
      }

      const { data: result, error } = await query;

      if (error) throw error;

      if (!result || result.length < pageSize) {
        setHasMore(false);
      }

      setData((prev) => [...prev, ...result]);
      pageRef.current += 1;
    } catch (err) {
      console.log(err);
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  }, [table, select, pageSize, orderBy, filters, loading, hasMore]);

  const reset = () => {
    setData([]);
    pageRef.current = 0;
    setHasMore(true);
    setError(null);
  };
  
  return { data, loading, error, hasMore, loadMore, reset };
}
