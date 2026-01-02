import { useState, useEffect, useContext, useEffectEvent } from "react";
import { useSearchParams, Link } from "react-router";

import { clsx } from "clsx";

import supabase from "@/utilis/supabase";
import type { LessonType } from "@/types.ts";

import { FaShoppingCart } from "react-icons/fa";

import { CartContext } from "@/contexts/contexts.ts";
import type { CartContextType } from "@/contexts/contexts";

import StoreConsole from "./StoreConsole";
import StoreLoading from "./StoreLoading";
import StoreError from "./StoreError";
import StoreData from "./StoreData";

const Store = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const cartContext = useContext<CartContextType | null>(
    CartContext
  );
  const { cart, handleCartItem } = cartContext!;
  // const { user } = useContext<AuthContextType | null>(AuthContext);

  const [brochures, setBrochures] = useState<LessonType[]>([]);
  // const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  const [displayList, setDisplayList] = useState<boolean>(false);

  const handleParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => params.set(k, String(v)));
      return params;
    });
  };

  const fetchBrochures = async () => {
    setLoading(true);
    setError("");

    const classRoom = searchParams.get("class");
    const branch = searchParams.get("branch");
    const sort = searchParams.get("sort");
    const filter =
      classRoom && branch ? { class: classRoom, branch: branch } : null;
    const order = sort ? sort : "popular";

    let query = supabase.from("brochures").select("*");
    if (filter) {
      query = query.eq("class", filter.class).eq("branch", filter.branch);
    }
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    switch (order) {
      case "popular":
        query = query.order("views", { ascending: false });
        break;
      case "rated":
        query = query.order("rating", { ascending: false });
        break;
      case "demand":
        query = query.order("boughted", { ascending: false });
        break;
      case "asc":
        query = query.order("price", { ascending: true });
        break;
      case "dsc":
        query = query.order("price", { ascending: false });
        break;
    }

    const { data, error } = await query;
    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    console.log(data);

    setBrochures(data);
    setLoading(false);
  };

  const sideEffectFetch = useEffectEvent(() => {
    fetchBrochures();
  });
  useEffect(() => {
    sideEffectFetch();
  }, [search, searchParams]);

  return (
    <>
      <StoreConsole
        search={search}
        setSearch={setSearch}
        handleParams={handleParams}
        displayList={displayList}
        setDisplayList={setDisplayList}
      />
      {loading ? (
        <StoreLoading />
      ) : error ? (
        <StoreError error={error} retry={() => fetchBrochures()} />
      ) : (
        <StoreData
          brochures={brochures}
          cart={cart}
          handleCartItem={handleCartItem}
        />
      )}
      <Link
        to="/store/cart"
        className={clsx(
          "fixed bottom-5 left-10 bg-green-500 px-5 py-3 rounded shadow-lg cursor-pointer hover:bg-green-600 transition ease-in-out delay-300 z-50 flex justify-center items-center gap-3",
          cart.length > 0 ? "translate-y-0" : "translate-y-96"
        )}
      >
        <FaShoppingCart className="text-white" />
        <h1 className="text-white font-semibold">
          الذهاب إلى السلة ({cart.length})
        </h1>
      </Link>
    </>
  );
};

export default Store;
