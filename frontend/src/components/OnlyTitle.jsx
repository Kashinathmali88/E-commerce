import React from "react";

function OnlyTitle({ text1, text2, fontSize }) {
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center gap-5">
        <p className={`text-${fontSize} font-bold text-slate-500`}>
          {text1 + " "}
          <span
            className="text-black
          "
          >
            {text2}
          </span>
        </p>
        <hr className="sm:border-t-4 sm:w-24 sm:border-gray-700" />
      </div>
    </div>
  );
}

export default OnlyTitle;
