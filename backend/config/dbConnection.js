import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ DB Connected");
  });
  await mongoose.connect(`${process.env.MONGO_DB_URL}/E-commerce`);
};

export default dbConnect;
