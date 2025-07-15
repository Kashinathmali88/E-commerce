import React, { useContext, useState } from "react";
import OnlyTitle from "../components/OnlyTitle";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContex";
import { SiRazorpay } from "react-icons/si";
import { FaCcStripe } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function PlaceOrder() {
  const [paymentOpt, setPaymentOpt] = useState("cod");
  const {
    navigate,
    cartItems,
    products,
    getCartAmount,
    delivery_fee,
    backendUrl,
    setCartItems,
  } = useContext(ShopContext);

  const { register, handleSubmit } = useForm();

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      descriptiton: "Order Payment",
      order_id: order.razorpay_order_id,
      recepit: order.recepit,
      handler: async (res) => {
        try {
          const response = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            res,
            {
              withCredentials: true,
            }
          );
          if (response.success) {
            await setCartItems({});
            await navigate("/orders");
          } else {
            console.log(error);
            toast.error(error);
          }
        } catch (error) {}
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const onSubmit = async (data) => {
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              (itemInfo.size = item),
                (itemInfo.quantity = cartItems[items][item]);
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: data,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (paymentOpt) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/cod`,
            orderData,
            { withCredentials: true }
          );
          if (response.data.success) {
            navigate("/orders");
            setCartItems({});
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { withCredentials: true }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            console.log(responseStripe.data);
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { withCredentials: true }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-11/12 mx-auto h-auto sm:flex sm:justify-around justify-center"
    >
      <div className="w-2/6 ">
        <div className="h-24 tracking-tighter flex justify-start mb-4">
          <OnlyTitle
            text1={"DELIVERY"}
            text2={"INFORMATION"}
            fontSize={"2xl"}
          />
        </div>

        <div className="w-[350px]  h-full">
          <div className="w-full flex gap-3 justify-between">
            <input
              {...register("firstName")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="First name"
              required
            />
            <input
              {...register("lastName")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <input
              {...register("email")}
              className="w-full px-3 py-1 border border-slate-400 mt-4"
              type="text"
              placeholder="Email address"
              required
            />
            <input
              {...register("street")}
              className="w-full px-3 py-1 border border-slate-400 mt-4"
              type="text"
              placeholder="Street"
              required
            />
          </div>
          <div className="w-full flex gap-3 justify-between mt-4">
            <input
              {...register("city")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="City"
              required
            />
            <input
              {...register("state")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="w-full flex gap-3 justify-between mt-4">
            <input
              {...register("zipCode")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="Zipcode"
              required
            />
            <input
              {...register("contry")}
              className="border w-1/2 border-slate-400 px-3 py-1"
              type="text"
              placeholder="Contry"
              required
            />
          </div>
          <div className="w-full">
            <input
              {...register("phone")}
              className="w-full px-3 py-1 border border-slate-400 mt-4"
              type="text"
              placeholder="Phone"
              required
            />
          </div>
        </div>
      </div>
      <div className="sm:w-2/6 flex flex-col">
        <div className="w-full h-1/2">
          <CartTotal />
        </div>
        <div className="h-1/2">
          <div className="flex justify-start">
            <OnlyTitle text1={"PAYMENT"} text2={"METHOD"} fontSize={"2xl"} />
          </div>

          <div className="flex sm:justify-center sm:flex-row flex-col gap-4 mt-4">
            <div
              onClick={() => setPaymentOpt("stripe")}
              className="border cursor-pointer border-slate-400 px-3 py-2 flex gap-2 items-center rounded-md shadow-xl"
            >
              <p
                className={`border border-slate-400 rounded-full w-3 h-3 ${
                  paymentOpt === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-3xl text-blue-600">
                <FaCcStripe />
              </p>
            </div>
            <div
              onClick={() => setPaymentOpt("razorpay")}
              className="border cursor-pointer border-slate-400 px-3 py-2 flex gap-2 items-center rounded-md shadow-xl"
            >
              <p
                className={`border border-slate-400 rounded-full w-3 h-3 ${
                  paymentOpt === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="flex tracking-tighter text-xl">
                <SiRazorpay />
                <i className="text-blue-900 font-semibold">RazarPay</i>
              </p>
            </div>
            <div
              onClick={() => setPaymentOpt("cod")}
              className="border cursor-pointer border-slate-400 px-3 py-2 flex gap-2 items-center rounded-md shadow-xl"
            >
              <p
                className={`border border-slate-400 rounded-full w-3 h-3 ${
                  paymentOpt === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full flex justify-end mt-3 mb-36">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black px-4 py-2 rounded-md text-slate-100 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
