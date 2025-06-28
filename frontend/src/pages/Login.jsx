import React, { useContext, useState, useEffect } from "react";
import OnlyTitle from "../components/OnlyTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ShopContext } from "../context/ShopContex";
import toast from "react-hot-toast";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { register, handleSubmit, reset, unregister } = useForm();
  const { backendUrl, navigate, setIsLoggedIn, getUserData } =
    useContext(ShopContext);

  useEffect(() => {
    if (currentState === "Login") {
      unregister("name");
    }
  }, [currentState]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (currentState === "Sign up") {
      formData.append("name", data.name);
    }

    const endpoint =
      currentState === "Login"
        ? `${backendUrl}/api/user/login`
        : `${backendUrl}/api/user/registerUser`;

    try {
      await axios
        .post(endpoint, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsLoggedIn(true);
            getUserData();
            toast.success(response.data.message);
            reset();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);

          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-36"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <OnlyTitle text2={currentState} text1={""} fontSize={"3xl"} />
      </div>
      {currentState === "Sign up" && (
        <input
          {...register("name")}
          className="w-full border px-2 py-1 border-gray-800 mt-2"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
      )}
      <input
        {...register("email")}
        className="w-full border px-2 py-1 border-gray-800 mt-2"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <input
        {...register("password")}
        className="w-full border px-2 py-1 border-gray-800 mt-2"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between mt-2">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="cursor-pointer w-full rounded-lg bg-black text-slate-200 py-2 mt-3 text-lg font-light">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
