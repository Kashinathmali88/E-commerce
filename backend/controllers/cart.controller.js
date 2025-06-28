import User from "../models/user.model.js";

// add product to cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const user = await User.findById({ _id: req.userId });
    let cartData = await user.cartData;
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

    await User.findByIdAndUpdate({ _id: req.userId }, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const user = await User.findById({ _id: req.userId });
    let cartData = user.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate({ _id: req.userId }, { cartData });
    return res.json({ success: true, message: "cart updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// get user cart
const getUserCart = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    const cartData = user.cartData;
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
