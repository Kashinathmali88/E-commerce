import express from "express";
import adminAuth from "../middleware/adminAuth.middleware.js";
import userAuth from "../middleware/userAuth.middleware.js";
import {
  allOrders,
  placeOrder,
  placeOrderWithRazorpay,
  placeOrderWithStripe,
  updateStatus,
  userOrders,
  verifyRazorpay,
  verifyStripe,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// admin
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// user
orderRouter.post("/cod", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderWithStripe);
// verify payment
orderRouter.post("/verifyStripe", userAuth, verifyStripe);
orderRouter.post("/verifyRazorpay", userAuth, verifyRazorpay);
orderRouter.post("/razorpay", userAuth, placeOrderWithRazorpay);
orderRouter.get("/userOrders", userAuth, userOrders);

export default orderRouter;
