import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { toast } from "react-hot-toast";

function Order() {
  const [orders, setOrders] = useState([]);
  const { backendUrl } = useContext(AdminContext);
  const featchAllOrders = async () => {
    try {
      await axios
        .get(`${backendUrl}/api/order/list`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.orders);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const statusHandler = async (e, orderId) => {
    try {
      await axios
        .post(
          `${backendUrl}/api/order/status`,
          {
            status: e.target.value,
            orderId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            featchAllOrders();
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    featchAllOrders();
  }, []);
  return (
    <div className="min-w-screen min-h-screen">
      <p className="text-2xl font-bold pl-20 pt-20 text-slate-800">
        Order Page
      </p>
      <div className="w-[100vw] min-h-screen sm:ml-20 ml-10 mt-4 flex flex-col gap-2">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="w-full min-h-4 border border-slate-400 grid sm:grid-cols-10 grid-col-5 items-center pl-7 font-light"
            >
              <div className="h-16 w-16 border border-slate-400 col-span-1">
                <TbTruckDelivery className="w-16 h-16 text-slate-700 p-2" />
              </div>
              <div className="sm:col-span-2 col-span-1 mt-2">
                <p>
                  {order.items.map((item, ind) => {
                    return <span key={ind}>{item.name}</span>;
                  })}
                </p>

                <p className="font-bold">
                  {order.address.firstName.charAt(0).toUpperCase() +
                    order.address.firstName.slice(1) +
                    " "}
                  {order.address.lastName.charAt(0).toUpperCase() +
                    order.address.lastName.slice(1) +
                    " "}
                </p>
                <p>
                  <span>{order.address.street}</span>{" "}
                </p>
                <p>
                  <span>{order.address.city}</span>,{" "}
                  <span>{order.address.state}</span>,{" "}
                  <span>{order.address.contry}</span>,{" "}
                  <span>{order.address.zipCode}.</span>
                </p>
                <p>
                  <span>{order.address.email}</span>
                  <br />
                  <span>{order.address.phone}</span>
                </p>
              </div>
              <div className="sm:col-span-2 col-span-1 mt-2">
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>
                  Payment :{" "}
                  <span
                    className={`p-1 text-sm font-semibold text-white rounded-xl ${
                      order.payment ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>Date : {new Date(order.date).toDateString()}</p>
              </div>
              <div className="sm:col-span-1 col-span-1 mt-2">
                <p className="text-[15px] font-semibold">${order.amount}</p>
              </div>
              <div className="sm:col-span-4 col-span-1 mt-2 mb-2 px-8 py-2 ">
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="px-2 py-1 border border-slate-400 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
