import React, { useContext } from "react";
import hero from "../assets/hero-left.avif";
function Hero() {
  return (
    <div className="sm:w-10/12 w-96 h-[500px] border mx-auto mt-10 flex sm:flex-row flex-col">
      {/* left hero content */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="flex justify-center items-center w-3xl">
          <div className="w-1/2 h-1/2 ">
            <div className="flex gap-4 items-center mb-5">
              <hr className="hidden sm:block border-t-4 border-gray-700 w-21" />
              <p className="hidden sm:block text-xl font-medium tracking-tighter text-slate-500">
                OUR BESTSELLERS
              </p>
            </div>
            <p className="font-bold text-5xl tracking-tight prata-regular">
              Latest Arrivals
            </p>
            <div className="flex gap-4 items-center mt-5">
              <p className=" hidden sm:block text-xl font-medium tracking-tighter text-slate-500">
                SHOP NOW
              </p>
              <hr className="hidden sm:block border-t-4 border-gray-700 w-21" />
            </div>
          </div>
        </div>
      </div>
      {/* right hero content  */}
      <div className=" sm:w-1/2 w-96">
        <img
          className="object-cover w-full sm:h-[500px] h-[370px]"
          // src="src\assets\hero-left.avif"
          src={hero}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
