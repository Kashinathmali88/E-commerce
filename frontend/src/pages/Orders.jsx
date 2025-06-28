import React from "react";
import OnlyTitle from "../components/OnlyTitle";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContex";

function Orders() {
  const { backendUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const fatchOrders = async () => {
    await axios
      .get(`${backendUrl}/api/order/userOrders`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          let allOrdersItem = [];
          res.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrdersItem.push(item);
            });
          });
          setOrderData(allOrdersItem.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fatchOrders();
  }, []);
  return (
    <div className="w-11/12 min-h-screen mx-auto">
      <div className="flex justify-start ml-20 mb-10">
        <OnlyTitle text1={"MY"} text2={"ORDERS"} fontSize={"3xl"} />
      </div>
      <div className="w-[80%] min-h-screen ml-28">
        {orderData.map((order, index) => {
          return (
            <div
              key={index}
              className="w-full flex sm:flex-row flex-col sm:justify-around gap-8 border-y border-slate-300  p-3"
            >
              <img className="w-auto h-24" src={`${order.image[0]}`} alt="" />
              <div>
                <p className="text-xl font-bold w-1/2 sm:w-full">
                  {order.name}
                </p>
                <div className="flex gap-4 items-center text-lg font-medium">
                  <p>
                    Price:
                    <span className="font-light text-slate-600">
                      {order.price}$
                    </span>
                  </p>
                  <p>
                    Quentity:
                    <span className="font-light text-slate-600">
                      {order.quantity}
                    </span>
                  </p>
                  <p>
                    Size:
                    <span className="font-light text-slate-600">
                      {order.size}
                    </span>
                  </p>
                </div>
                <div className="text-lg font-medium">
                  <p>
                    Date:
                    <span className="text-slate-600 font-light">
                      {" " + new Date(order.date).toDateString()}
                    </span>
                  </p>
                  <p>
                    Payment:
                    <span className="text-slate-600 font-light">
                      {" " + order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 tracking-tighter">
                <p className="min-w-3 h-3 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={fatchOrders}
                  className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
