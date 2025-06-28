import React, { useContext } from "react";
import OnlyTitle from "./OnlyTitle";
import { ShopContext } from "../context/ShopContex";
function CartTotal() {
  const { getCartAmount, delivery_fee, currency, navigate } =
    useContext(ShopContext);
  return (
    <div className="w-auto h-auto bg-white">
      <div className="w-full text-lg flex justify-start">
        <OnlyTitle text1={"CART"} text2={"TOTAL"} fontSize={"2xl"} />
      </div>
      <div className="h-auto w-full">
        <div className="flex justify-between border-b border-slate-400 p-3">
          <p className="text-lg font-medium">Subtotal</p>
          <p className="text-lg font-medium">
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <div className="flex justify-between border-b border-slate-400 p-3">
          <p className="text-lg font-medium">Shipping Fee</p>
          <p className="text-lg font-medium">
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <div className="flex justify-between border-b border-slate-400 p-3">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee + ".00"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
