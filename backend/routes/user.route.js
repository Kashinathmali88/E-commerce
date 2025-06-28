import express from "express";
import {
  adminLogin,
  adminLogOut,
  getUser,
  isAuth,
  isAuthUser,
  loginUser,
  registerUser,
  userLogOut,
} from "../controllers/user.controller.js";
import userAuth from "../middleware/userAuth.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/registerUser", registerUser);
userRouter.post("/adminLogin", adminLogin);

// protected routes
userRouter.get("/isAuth", adminAuth, isAuth);
userRouter.get("/adminLogOut", adminLogOut);

userRouter.get("/isAuthUser", userAuth, isAuthUser);
userRouter.get("/userLogOut", userLogOut);
userRouter.get("/get", userAuth, getUser);

export default userRouter;
