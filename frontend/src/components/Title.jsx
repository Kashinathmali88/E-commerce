import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center gap-5">
        <p className="sm:text-3xl text-2xl font-bold text-slate-500">
          {text1 + " "}
          <span className="text-black">{text2}</span>
        </p>
        <hr className="border-t-4 w-24 border-gray-700" />
      </div>
      <p className="hidden sm:block text-center text-black opacity-90 mt-4 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab officiis
        tempore nihil iure, omnis consequatur quasi nam totam facilis sit.
      </p>
    </div>
  );
}

export default Title;
