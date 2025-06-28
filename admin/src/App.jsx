import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { isLoggedIn } = useContext(AdminContext);
  return (
    <div className="overflow-hidden">
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div>
              <div>
                <Routes>
                  <Route path="/add" element={<Add />}></Route>
                  <Route path="/" element={<Add />}></Route>
                  <Route path="/List" element={<List />}></Route>
                  <Route path="/Order" element={<Order />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
