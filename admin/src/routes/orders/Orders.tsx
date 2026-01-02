import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useEffectEvent,
} from "react";
import { Helmet } from "react-helmet";

import Header from "@/Components/Header";
import Loading from "@/components/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";
import supabase from "@/utilis/supabase";
import OrdersError from "./OrdersError";
import OrdersLoading from "./OrdersLoading";
import OrdersData from "./OrdersData";
import { useInfiniteScroll } from "../../hooks/useInfiteScroll";
import OrderDataConsole from "./OrderDataConsole";
import { useSearchParams } from "react-router";
import { ImSpinner8 } from "react-icons/im";

const Orders = () => {
  const pageSize = 20;

  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(0);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*,profiles(avatar,firstname,lastname)")
        .order("created_at", { ascending: false })
        .range(0, pageSize - 1);
      if (error) throw error;
      setOrders(data);
      if (!data || data.length < pageSize) setHasMore(false);
      pageRef.current = 1;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreOrders = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*,profiles(avatar,firstname,lastname)")
        .order("created_at", { ascending: false })
        .range(
          pageRef.current * pageSize,
          pageRef.current * pageSize + pageSize - 1
        );
      if (error) throw error;
      setOrders((prev) => [...prev, ...data]);
      if (!data || data.length < pageSize) setHasMore(false);
      pageRef.current += 1;
    } catch (error) {
      setError(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchOrdersEvent = useEffectEvent(() => fetchOrders());

  useEffect(() => {
    fetchOrdersEvent();
  }, [searchParams]);

  const scrollInfinite = useInfiniteScroll(fetchMoreOrders, hasMore);

  return (
    <>
      <Helmet>
        <title>العقل المدبر | الطلبات</title>
      </Helmet>

      <Header title={"الطلبات"} />
      <OrderDataConsole setSearchParams={setSearchParams} />
      {loading ? <OrdersLoading /> : <OrdersData data={orders} />}
      {loadingMore && <ImSpinner8 />}
      {error && <OrdersError error={error} retry={fetchOrders} />}
      <div ref={scrollInfinite} />
    </>
  );
};

export default Orders;
