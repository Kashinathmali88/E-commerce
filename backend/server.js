import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnet from "./config/dbConnection.js";
import connectColudinay from "./config/coludinary.js";
import cookieParser from "cookie-parser";
dotenv.config();
// import routers to mount
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

//  App Config
const app = express();
const port = process.env.PORT || 4000;
dbConnet();
connectColudinay();

// Middlewares Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const originForDev = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

// Api mount
app.use("/api/user/", userRouter);
app.use("/api/product/", productRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Api working!!!");
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
