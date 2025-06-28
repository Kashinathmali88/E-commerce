import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { MdOutlineBorderColor } from "react-icons/md";

function Sidebar() {
  return (
    <div className="min-w-[18%] min-h-screen border-r flex flex-col   border-slate-400">
      <div className="flex p-4 w-full ml-4 justify-center items-center">
        <NavLink
          to={"/add"}
          className={
            "border-y border-l border-slate-400 w-full flex gap-2 justify-center p-1"
          }
        >
          <IoIosAddCircleOutline className="text-4xl md:text-2xl  text-slate-600" />
          <p className="hidden md:block font-medium text-2xl md:text-xl text-slate-600 ">
            Add Item
          </p>
        </NavLink>
      </div>

      <div className="flex p-4 w-full ml-4 justify-center items-center">
        <NavLink
          to={"/list"}
          className={
            "border-y border-l border-slate-400 w-full flex gap-2 justify-center p-1"
          }
        >
          <CiViewList className="text-4xl md:text-2xl text-slate-600" />
          <p className="hidden md:block font-medium text-2xl md:text-xl text-slate-600 ">
            List Item
          </p>
        </NavLink>
      </div>

      <div className="flex p-4 w-full ml-4 justify-center items-center">
        <NavLink
          to={"/order"}
          className={
            "border-y border-l border-slate-400 w-full flex gap-2 justify-center p-1"
          }
        >
          <MdOutlineBorderColor className="text-4xl md:text-2xl text-slate-600" />
          <p className="hidden md:block font-medium text-2xl md:text-xl text-slate-600">
            Orders
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
