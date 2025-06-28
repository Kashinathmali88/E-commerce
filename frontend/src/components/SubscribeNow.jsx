import React from "react";

function SubscribeNow() {
  return (
    <div className="w-11/12 mx-auto mt-20">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-2">
            Subscribe now & get 20% off
          </h1>
          <p className="font-extralight text-xl text-slate-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            dolores. Fugiat, quas.
          </p>
        </div>

        <div className="mt-12 mb-20 flex">
          <input
            className="w-[300px] h-10 border sm:border-r-0 outline-slate-900"
            type="text"
            placeholder="  Enter your email"
            required
          />
          <button className="px-4 py-2 bg-slate-900 text-slate-100 cursor-pointer hover:bg-slate-700">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeNow;
