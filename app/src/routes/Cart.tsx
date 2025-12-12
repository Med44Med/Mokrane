import { useContext, useState, useEffect } from "react";
import { CartContext, AuthContext } from "../contexts/contexts.ts";

import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import type { CartContextType, AuthContextType } from "../contexts/contexts";
import type { OrderType, BrochureType } from "../types.ts";

const generateOrderNo = (): string => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}${randomNum}`;
};

const Cart = () => {
  const { cart, handleCartItem } = useContext<CartContextType | null>(
    CartContext
  );
  // const { user } = useContext<AuthContextType | null>(AuthContext);

  // const { id } = user;
  const id='4'
  console.log(cart);

  const [order, setOrder] = useState<OrderType>({
    orderNo: null,
    user: null,
    items: [],
    coupon: null,
    total: 0,
  });

  useEffect(() => {
    (() => {
      setOrder({
        orderNo: generateOrderNo(),
        user: id,
        items: cart,
        coupon: null,
        total: cart.reduce((acc: number, item: BrochureType) => {
          return acc + item.price;
        }, 0),
      });
    })();
  }, [cart, id]);

  //coupon states
  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponResponse, setCouponResponse] = useState<{
    name: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCouponApply = async () => {
    setCouponLoading(true);
    setCouponError("");
    // Simulate coupon validation
    if (!coupon) {
      setCouponError("");
      setCouponLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // For demonstration, let's assume the coupon is always valid
    setCouponResponse({ name: coupon, discount: 80 });
    setCoupon("");
    setCouponLoading(false);
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError(null);
    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-6 cursor-default">
        <FaShoppingCart className="text-3xl" />
        <h1 className="text-3xl font-semibold ">دروس مختارة</h1>
      </div>
      <div className="flex-1 w-full flex justify-between items-center gap-3">
        <div className="bg-black/50 h-full flex-3 rounded-2xl p-3 flex flex-col">
          {cart.length === 0 ? (
            <Link to="/store" className="w-full text-center my-auto">
              لا توجد دروس مختارة
            </Link>
          ) : (
            cart.map((item: BrochureType) => (
              <div
                key={item.id}
                className="w-full flex justify-start items-center gap-3 border-b border-white/10 py-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 aspect-square rounded-lg object-cover object-center"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <p className="text-sm text-white/50 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="px-10 text-xl ">{item.price}</div>
                <div className="text-lg font-semibold text-green-500">
                  <RiDeleteBin6Line
                    onClick={() => {
                      handleCartItem(item);
                    }}
                    className="text-xl text-green-500 cursor-pointer transition hover:text-orange-500"
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-black/50 h-full flex-1 rounded-2xl p-10 flex flex-col">
          <div className="py-3 flex justify-start items-center gap-3">
            <h1 className="text-xl font-semibold">المجموع :</h1>
            <h1 className="text-xl font-semibold text-center ">
              {order.total}
            </h1>
          </div>
          <div className="mt-auto border-y border-white/10 my-1 py-5">
            <div className="flex gap-3 items-center">
              <h1 className="text-base text-white/70 py-2 text-nowrap">
                رمز قسيمة :
              </h1>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="px-3 py-1 text-sm outline-none border border-solid border-white/50 rounded focus:border-green-500/50"
              />
            </div>

            {couponResponse ? (
              <h1 className="text-sm text-green-500 mt-2">
                {couponResponse.name} صالحة (خصم {couponResponse.discount}%)
              </h1>
            ) : (
              <button
                onClick={handleCouponApply}
                className=" pt-1 rounded w-full text-green-500 cursor-pointer hover:underline"
              >
                {couponLoading ? "جاري التطبيق..." : "تطبيق القسيمة"}
              </button>
            )}
            {couponError && (
              <h1 className="text-sm text-red-500 mt-2">{couponError}</h1>
            )}
          </div>
          <h1 className="text-2xl font-semibold">المجموع النهائي :</h1>
          <h1 className="text-3xl font-semibold text-green-500 text-center py-3">
            {couponResponse
              ? order.total - (order.total * couponResponse.discount) / 100
              : order.total}
          </h1>
          <button
            onClick={handleSubmitOrder}
            className="mt-3 bg-green-500 w-full py-3 rounded"
          >
            {loading ? "جاري الإتمام..." : "إتمام الشراء"}
          </button>
          {error && <h1 className="text-sm text-red-500 mt-2">{error}</h1>}
        </div>
      </div>
    </>
  );
};

export default Cart;
