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

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.ORIGIN_ADMIN, process.env.ORIGIN_FRONTEND]
        : ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
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
