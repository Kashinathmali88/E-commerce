import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controller.js";
import userAuth from "../middleware/userAuth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.put("/update", userAuth, updateCart);
cartRouter.get("/get", userAuth, getUserCart);

export default cartRouter;
