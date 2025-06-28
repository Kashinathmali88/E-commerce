import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const { backendUrl, setIsLoggedIn } = useContext(AdminContext);

  const logOut = async () => {
    await axios
      .get(`${backendUrl}/api/user/adminLogOut`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(false);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-between py-2 px-[4%] items-center border-b border-slate-400">
      <img
        className="w-36 sm:h-18 sm:w-32 sm:ml-9"
        src="..\src\assets\Sneaker.png"
        alt="logo"
      />
      <button
        onClick={() => logOut()}
        className="cursor-pointer bg-slate-800 px-8 sm:px-6 sm:py-2 py-3 sm:mr-9 text-xl font-medium hover:bg-slate-400 hover:text-slate-800 text-slate-200 rounded-md"
      >
        LogOut
      </button>
    </div>
  );
}

export default Navbar;
