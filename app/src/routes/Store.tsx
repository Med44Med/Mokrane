import { useState, useEffect, useContext } from "react";
import { clsx } from "clsx";

import supabase from "../utilis/supabase";
import type { LessonType, BrochureType } from "../types.ts";

import { BsGrid3X3GapFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { FaStore, FaShoppingCart } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

import { Link } from "react-router";
import { CartContext } from "../contexts/contexts.ts";
import type { CartContextType } from "../contexts/contexts";
import Header from "../Components/UI/Header";
import { Price } from "../utilis/Price";
import Button from "../Components/UI/Button";
import StoreCard from "../Components/UI/StoreCard";
import Input from "../Components/UI/Input";

const Store = () => {
  // const lessonsPerPage = 20;

  const cartContext = useContext<CartContextType | null>(CartContext);
  if (!cartContext) {
    throw new Error("CartContext is null");
  }
  const { cart, handleCartItem } = cartContext!;

  const [loading, setLoading] = useState<boolean>(false);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  // const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>("popular");
  const [displayList, setDisplayList] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: brochures, error } = await supabase
        .from("brochures")
        .select("*");

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      setLessons(brochures);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Header title="المتجر" />
      <div className="w-full mb-3 flex justify-between items-center">
        <Input
          autoFocus
          type="text"
          placeholder="بحث..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 px-5 py-2 rounded-xl bg-black/20 text-white outline-none border-2 border-transparent transition focus:border-green-500/50"
        />
        <div className="flex justify-center items-center gap-5">
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-5 py-2 rounded-xl bg-black/20 text-white outline-none border-2 border-transparent transition focus:border-green-500/50"
          >
            <option value="popular" className="bg-white text-black">
              الأكثر تقييما
            </option>
            <option value="demand" className="bg-white text-black">
              الأكثر طلبا
            </option>
            <option value="asc" className="bg-white text-black">
              السعر تصاعديًا
            </option>
            <option value="dsc" className="bg-white text-black">
              السعر التنازلي
            </option>
          </select>
          <div className="flex justify-center items-center gap-3">
            <TiThMenu
              onClick={() => setDisplayList(true)}
              className={clsx(
                "text-2xl cursor-pointer transition hover:text-green-500",
                displayList ? "text-green-500" : "text-white"
              )}
            />
            <BsGrid3X3GapFill
              onClick={() => setDisplayList(false)}
              className={clsx(
                "text-2xl cursor-pointer transition hover:text-green-500",
                !displayList ? "text-green-500" : "text-white"
              )}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="bg-black/20 min-h-56 w-full shadow p-5 rounded-2xl flex justify-center items-center">
          <ImSpinner8 className="text-green-500 animate-spin text-5xl" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="bg-black/20 min-h-56 w-full shadow p-5 rounded-2xl flex justify-center items-center">
          <h1 className="text-3xl font-semibold">لا يوجد دروس</h1>
        </div>
      ) : (
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-10 gap-y-10 md:gap-y-10 md:p-0">
          {lessons.map((l) => (
            <StoreCard
              key={l.id}
              l={l}
              handleCartItem={handleCartItem}
              cart={cart}
            />
          ))}
        </div>
      )}
      <Link
        to="/store/cart"
        className={clsx(
          "fixed bottom-5 left-10 bg-green-500 px-5 py-3 rounded shadow-lg cursor-pointer hover:bg-green-600 transition ease-in-out delay-300 z-50 flex justify-center items-center gap-3",
          cart.length > 0 ? "translate-y-0" : "translate-y-96"
        )}
      >
        <FaShoppingCart />
        <h1 className="text-white font-semibold">
          الذهاب إلى السلة ({cart.length})
        </h1>
      </Link>
    </>
  );
};

export default Store;
