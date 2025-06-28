import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import OnlyTitle from "../components/OnlyTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, cartItems, currency, navigate, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="w-11/12 min-h-screen mx-auto">
      <div className="p-4 w-full flex justify-start">
        <OnlyTitle text1={"Your"} text2={"Cart"} fontSize={"3xl"} />
      </div>
      {/* cart items list  */}
      {cartData.map((item, index) => {
        const productData = products.find(
          (product) => product._id === item._id
        );

        if (!productData) return null;
        return (
          <div key={index}>
            <div className="w-full h-40 border grid grid-cols-9  border-x-0 border-slate-200 items-center">
              <div className="p-4 w-56 md:col-span-2 col-span-1">
                <img className="h-32 w-56 " src={productData.image[0]} alt="" />
              </div>
              <div className="col-span-3">
                <p className="text-xl font-medium">{productData.name}</p>
                <div className="h-full flex gap-4 items-center mt-4">
                  <p className="text-lg font-medium">
                    {currency}
                    {productData.price}
                  </p>
                  <p className=" bg-slate-200 px-3 text-slate-900 py-2 font-medium text-lg">
                    {item.size}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <input
                  className="w-32 h-7 pl-2 border border-slate-400 outline-0"
                  type="number"
                  min={1}
                  name=""
                  id=""
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
              </div>
              <div
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="ml-36 col-span-2 w-12 h-12 bg-red-400 flex justify-center items-center rounded-full"
              >
                <RiDeleteBinLine className="text-2xl font-bold cursor-pointer" />
              </div>
            </div>
          </div>
        );
      })}
      {/* cart item list end */}
      <div className="w-full h-[500px] flex flex-col items-end">
        <CartTotal />
        <div className="flex justify-end mt-3 items-center">
          <button
            onClick={() => navigate("/place-order")}
            className="px-4 py-3 bg-black text-slate-100 rounded-lg cursor-pointer"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
