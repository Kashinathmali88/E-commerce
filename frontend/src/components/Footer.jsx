import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Sneaker.png";

function Footer() {
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-11/12 mx-auto h-40 flex">
        <div className="w-1/2 ml-10 h-full">
          <img className="w-36 h-20" src={logo} alt="" />
          <p className="hidden sm:block md:w-78 overflow-hidden  text-sm p-4 text-justify font-light opacity-95">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eos
            eius nisi quam eum reprehenderit ratione ex animi harum.
          </p>
        </div>
        <div className="sm:w-1/2  h-full flex justify-between">
          <div className="w-1/2">
            <h1 className="font-light text-2xl mb-2">COMPANY</h1>
            <ul className="text-md font-extralight text-left cursor-pointer ">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About us</li>
              </Link>
              <a
                href="https://e-commerce-admin-two-ecru.vercel.app/"
                target="_blank"
              >
                <li className="cursor-pointer">Admin</li>
              </a>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="w-1/2">
            <h1 className="font-light text-2xl mb-2">GET IN TOUCH</h1>
            <ul className="text-md font-extralight text-left cursor-pointer ">
              <li>+1-000-000-0000</li>
              <li>support@sneakerworld.com</li>
              <li>Git-hub</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="w-11/12 mx-auto h-14 flex justify-center items-center border-t border-gray-300">
        <p className="text-md font-light ">
          Copyright 2025@ All Right Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
