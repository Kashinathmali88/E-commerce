import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

function List() {
  const [list, setList] = useState([]);
  const { backendUrl } = useContext(AdminContext);

  const feachData = async () => {
    try {
      await axios
        .get(`${backendUrl}/api/product/list`)
        .then((res) => setList(res.data.product))
        .catch(() => res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      await axios
        .post(
          `${backendUrl}/api/product/remove`,
          { id },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          toast.success(res.data.message);
          feachData();
        })
        .catch(() => toast.error(res.data.message));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    feachData();
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex ">
      <div className="w-[80%] mx-auto h-auto">
        <div className="h-full mt-10">
          <p className="text-2xl font-bold p-4 text-slate-800">
            All Product List
          </p>
          <div className="flex sm:flex-col flex-row flex-wrap gap-2 ">
            <div className="hidden w-[80%] h-14 border bg-slate-100 rounded-md sm:grid sm:grid-cols-7  items-center text-xl font-bold">
              <p className="pl-2">Image</p>
              <p className="col-span-3 pl-2">Name</p>
              <p className="">Brand</p>
              <p>Price</p>
              <p>Action</p>
            </div>
            {/* map product form list state */}
            {list.map((item) => {
              return (
                <div
                  key={item._id}
                  className="sm:w-[80%] w-36 h-auto border rounded-md sm:grid sm:grid-cols-7 grid-cols-2  sm:items-center relative"
                >
                  <p className="">
                    <img
                      className="sm:w-auto sm:h-auto w-32 h-20 sm:p-2 rounded-xl"
                      src={item.image[0]}
                      alt=""
                    />
                  </p>
                  <p className="col-span-3 sm:pl-2 sm:text-xl sm:font-light font-bold text-lg capitalize pl-2 text-slate-600">
                    {item.name}
                  </p>
                  <p className="sm:text-xl sm:font-light font-bold text-lg pl-2 text-slate-600">
                    {item.brand}
                  </p>
                  <p className="sm:text-xl sm:font-light font-bold text-lg pl-2 text-slate-600">
                    {item.price}$
                  </p>
                  <div className="w-full h-10 flex sm:justify-center justify-end sm:items-center items-start">
                    <p
                      onClick={() => removeProduct(item._id)}
                      className="text-2xl font-light text-black bg-red-400 w-10 h-10  rounded-full flex justify-center items-center"
                    >
                      <RiDeleteBin6Line />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
