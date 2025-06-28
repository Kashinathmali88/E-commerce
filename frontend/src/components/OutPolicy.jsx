import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePolicy } from "react-icons/md";

function OutPolicy() {
  return (
    <div className="w-11/12 mx-auto sm:flex flex-row justify-around items-center mt-20">
      <div className="flex flex-col justify-between gap-6">
        <div className="mt-5 flex justify-center text-6xl">
          <FaExchangeAlt />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-light text-slate-950 text-2xl">
            Easy Exchange Policy
          </p>
          <p className="font-extralight text-slate-500 text-xl">
            We offer hassle free exchange policy
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="mt-5 flex justify-center text-6xl">
          <MdOutlinePolicy />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-light text-slate-950 text-2xl">
            7 Days Return Policy
          </p>
          <p className="font-extralight text-slate-500 text-xl">
            We provide 7 days free return policy
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="mt-5 flex justify-center text-6xl">
          <BiSupport />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="font-light text-slate-950 text-2xl">
            Best customer support
          </p>
          <p className="font-extralight text-slate-500 text-xl">
            We provide 24/7 customer support
          </p>
        </div>
      </div>
    </div>
  );
}

export default OutPolicy;
