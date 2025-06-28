import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
function Login({ setToken }) {
  const [email, setEmail] = useState("admin@sneakerworld.com");
  const [password, setPaasword] = useState("Admin@123");
  const { register, handleSubmit } = useForm();
  const { backendUrl, setIsLoggedIn } = useContext(AdminContext);

  const onSubmit = async (data) => {
    await axios
      .post(`${backendUrl}/api/user/adminLogin`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-gray-400 w-full min-h-screen flex justify-center items-center">
      <div className="bg-slate-50 p-4 h-70 w-fit rounded-md shadow-md">
        <h1 className="text-2xl text-gray-800 mb-2">Admin Panel</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-72">
            <p className="text-md font-medium mb-2 text-gray-700">
              Email Address
            </p>
            <input
              className="w-full px-3 py-2 mb-2 border outline-none"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              {...register("email")}
            />
          </div>
          <div className="w-72">
            <p className="text-md font-medium mb-2 text-gray-700">Password</p>
            <input
              className="w-full px-3 py-2 mb-2 border outline-none"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              {...register("password")}
            />
          </div>
          <button className="bg-black text-md text-slate-100 py-2 w-full rounded-md mt-1 cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
