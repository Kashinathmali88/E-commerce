import { createContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (prop) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select the size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (isLoggedIn) {
      await axios
        .post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // for delete and update the quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (isLoggedIn) {
      await axios
        .put(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let total = 0;

    for (const productId in cartItems) {
      const sizes = cartItems[productId];

      for (const size in sizes) {
        const quantity = sizes[size];
        const product = products.find((p) => p._id === productId);

        if (product) {
          total += product.price * quantity;
        }
      }
    }

    return total;
  };

  const getProducts = async () => {
    try {
      await axios
        .get(`${backendUrl}/api/product/list`)
        .then((res) => setProducts(res.data.product))
        .catch((err) => err.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserCart = async () => {
    await axios
      .get(`${backendUrl}/api/cart/get`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = async () => {
    const { data } = await axios.get(`${backendUrl}/api/user/get`, {
      withCredentials: true,
    });
    if (data.success) {
      setUserData(data.user);
    }
  };

  const isAuthUser = async () => {
    await axios
      .get(`${backendUrl}/api/user/isAuthUser`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
        }
      });
  };

  useEffect(() => {
    getProducts();
    isAuthUser();
    getUserCart();
  }, []);

  const value = {
    currency,
    delivery_fee,
    products,
    backendUrl,
    cartItems,
    isLoggedIn,
    navigate,
    addToCart,
    getCartCount,
    getCartAmount,
    setIsLoggedIn,
    getUserData,
    updateQuantity,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{prop.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
