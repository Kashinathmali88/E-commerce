import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import razorpay from "razorpay";

// globle variables
const currency = "usd";
const deliveryCharges = 10;

// getway initilize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing orders using cod
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate({ _id: userId }, { cartData: {} });
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// place order using Strip
const placeOrderWithStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const userId = req.userId;
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate({ _id: orderId }, { payment: true });
      await User.findByIdAndUpdate({ _id: userId }, { cartData: {} });
      return res.json({ success: true });
    } else {
      await Order.findByIdAndDelete({ _id: orderId });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// place order using Razorpay
const placeOrderWithRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      return res.json({
        success: true,
        order: {
          razorpay_order_id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_payment_id, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status == "paid") {
      await Order.findByIdAndUpdate(
        { _id: orderInfo.receipt },
        { payment: true }
      );
      await User.findByIdAndUpdate({ _id: userId }, { cartData: {} });
      return res.json({ success: true, message: "Payment successfull" });
    } else {
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// user order data for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// All orders data from admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// udate order status admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate({ _id: orderId }, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderWithStripe,
  placeOrderWithRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
