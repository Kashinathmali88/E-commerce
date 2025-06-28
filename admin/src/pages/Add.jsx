import React, { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

function Add({ token }) {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const sizes = watch("sizes", []);
  const { backendUrl } = useContext(AdminContext);

  const toggleSize = (size) => {
    const currentSizes = watch("sizes") || [];
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    setValue("sizes", updatedSizes);
  };

  useEffect(() => {
    register("sizes");
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("bestSeller", data.bestSeller ? "true" : "false");
    formData.append("sizes", JSON.stringify(JSON.stringify(data.sizes)));

    // Append image files (only if present)
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      if (data[key] && data[key][0]) {
        formData.append(key, data[key][0]);
      }
    });

    await axios
      .post(`${backendUrl}/api/product/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          reset();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen min-w-screen p-12 pt-2"
    >
      <div>
        <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2">
          Upload Images
        </p>
        <div className="flex gap-2 flex-wrap ">
          {["image1", "image2", "image3", "image4"].map((field, idx) => {
            const watchImage = watch(field);
            return (
              <div key={field}>
                <label htmlFor={field}>
                  {!watchImage || !watchImage[0] ? (
                    <BsCloudUpload className="cursor-pointer border w-24 h-24 text-slate-600 p-4" />
                  ) : (
                    <img
                      className="block w-auto h-24"
                      src={URL.createObjectURL(watchImage[0])}
                      alt={`upload-preview-${field}`}
                    />
                  )}
                  <input
                    {...register(field)}
                    type="file"
                    id={field}
                    name={field}
                    hidden
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2">
          Product name
        </p>
        <input
          {...register("name")}
          className="w-[60%] md:w-[40%] md:py-1 py-3 px-2 text-xl"
          type="text"
          name="name"
          id="name"
          placeholder="Type here"
        />
      </div>

      <div>
        <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2">
          Product description
        </p>
        <textarea
          {...register("description")}
          className="w-[60%] md:w-[40%] md:py-1 py-3 px-2 text-xl"
          name="description"
          id="description"
          placeholder="Write content here"
        />
      </div>

      <div className="flex gap-18 items-center">
        <div>
          <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2">
            Brand
          </p>
          <select
            {...register("brand")}
            className="w-[110px] px-2 py-2 text-xl"
            name="brand"
            id="brand"
          >
            <option value="Nike">Nike</option>
            <option value="New Balance">New Balance</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
        <div>
          <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2">
            Price
          </p>
          <input
            {...register("price")}
            className="w-[110px] py-2 px-2 text-xl"
            type="number"
            name="price"
            id="price"
            placeholder="25$"
          />
        </div>
      </div>
      <div>
        <p className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2">
          Sizes
        </p>
        <div className="sm:flex sm:flex-row grid grid-cols-2 sm:w-full gap-4">
          {["6", "7", "8", "9", "10", "11"].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p
                className={`cursor-pointer px-4 py-1 text-center ${
                  (sizes || []).includes(size)
                    ? "bg-slate-200 text-slate-950 border"
                    : "bg-slate-900 text-slate-200"
                } text-2xl md:text-xl font-medium transition-all`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <input
          {...register("bestSeller")}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          type="checkbox"
          name="bestSeller"
          id="bestSeller"
        />
        <label
          className="font-medium text-2xl md:text-xl text-slate-800 mb-2 mt-2"
          htmlFor="bestSeller"
        >
          Add to bestseller
        </label>
      </div>

      <div className="mt-1">
        <button className="cursor-pointer md:px-8 md:py-2 px-12 py-4 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-slate-50 rounded-md text-2xl md:text-xl">
          Add
        </button>
      </div>
    </form>
  );
}

export default Add;
