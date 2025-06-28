import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContex";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Verify() {
  const { navigate, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      await axios
        .post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      navigate("/cart");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return <div></div>;
}

export default Verify;
