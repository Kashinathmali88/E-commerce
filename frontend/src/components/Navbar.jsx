import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { ShopContext } from "../context/ShopContex";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [visibility, setVisibility] = useState(false);
  const { isLoggedIn, setIsLoggedIn, backendUrl, navigate, getCartCount } =
    useContext(ShopContext);

  const logOutUser = async () => {
    await axios
      .get(`${backendUrl}/api/user/userLogOut`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLoggedIn(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex items-center justify-around sm:border-b sm:border-slate-300  sm:sticky sm:top-0 bg-white z-50 min-h-16">
        <div className="w-36">
          <img className="w-36" src="src\assets\Sneaker.png" alt="logo" />
        </div>

        <div className="w-1/4">
          <ul className="hidden sm:flex justify-center items-center sm:gap-7 gap-2 text-slate-500 font-medium md:w-3/4">
            <NavLink to="/">
              <p>HOME</p>
              <hr className="hidden text-slate-500 border" />
            </NavLink>
            <NavLink to="/collection">
              <p>COLLECTION</p>
              <hr className="hidden text-slate-500 border" />
            </NavLink>
            <NavLink to="/about">
              <p>ABOUT</p>
              <hr className="hidden text-slate-500 border" />
            </NavLink>
            <NavLink to="/contact">
              <p>CONTACT</p>
              <hr className="hidden text-slate-500 border" />
            </NavLink>
          </ul>
        </div>

        <div className="flex sm:gap-8 gap-4 text-2xl">
          <FiSearch className="cursor-pointer" />
          <div className="group relative">
            <Link to={`${isLoggedIn ? "" : "/login"}`}>
              <FiUser className="cursor-pointer" />
            </Link>
            {isLoggedIn && (
              <div className="hidden group-hover:block absolute left-3 top-5 bg-slate-100 text-lg tracking-tighter px-2 py-4 w-24 rounded-md">
                <p className={`cursor-pointer text-slate-600 hover:text-black`}>
                  My Profile
                </p>
                <Link to={"/orders"}>
                  <p
                    className={`cursor-pointer text-slate-600 hover:text-black`}
                  >
                    Orders
                  </p>
                </Link>
                <p
                  onClick={() => logOutUser()}
                  className={`cursor-pointer text-slate-600 hover:text-black`}
                >
                  LogOut
                </p>
              </div>
            )}
          </div>

          <div className="flex relative">
            <Link to="/cart">
              <FiShoppingCart className="cursor-pointer" />
            </Link>

            <span className="text-sm  font-bold absolute left-5 top-[-10px] bg-black text-slate-200 rounded-full w-5 text-center animate-bounce">
              {getCartCount()}
            </span>
          </div>
          <div className="sm:hidden">
            <RxHamburgerMenu onClick={() => setVisibility(true)} />
          </div>
        </div>
      </div>

      {/* menu for small screen */}
      <div
        className={`bg-white h-[100%] overflow-hidden absolute top-0 left-0 bottom-0 transition-all ${
          visibility ? "w-full" : "w-0 hidden"
        }`}
      >
        <div className="flex flex-col m-7">
          <div className="text-3xl  flex items-center text-slate-500 ">
            <IoMdArrowBack onClick={() => setVisibility(false)} />
          </div>
          <div className="flex flex-col mt-2">
            <NavLink
              onClick={() => setVisibility(false)}
              to={"/"}
              className={"py-2 pl-6 border-b"}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisibility(false)}
              to={"/collection"}
              className={"py-2 pl-6 border-b"}
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisibility(false)}
              to={"/about"}
              className={"py-2 pl-6 border-b"}
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisibility(false)}
              to={"/contact"}
              className={"py-2 pl-6 border-b"}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
