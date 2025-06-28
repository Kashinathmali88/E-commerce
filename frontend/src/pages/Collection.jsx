import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContex";
import ProductItem from "../components/ProductItem";
import OnlyTitle from "../components/OnlyTitle";

function Collection() {
  const { products } = useContext(ShopContext);
  const [filterProducts, setfilterProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  function toggleBrandFilter(e) {
    if (brandFilter.includes(e.target.value)) {
      setBrandFilter((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setBrandFilter((prve) => [...prve, e.target.value]);
    }
  }

  function applyFilter() {
    let productsCopy = products.slice();
    if (brandFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        brandFilter.includes(item.brand)
      );
    }
    setfilterProducts(productsCopy);
  }

  useEffect(() => {
    applyFilter();
  }, [brandFilter]);

  function sortProduct() {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setfilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setfilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        setfilterProducts(filterProducts);
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType, products]);

  useEffect(() => {
    setfilterProducts(products);
  }, [products]);

  return (
    <div className="w-11/12 mx-auto flex ">
      {/* left filter section */}
      <div className="w-1/3 ml-20 h-auto mt-20 hidden sm:block">
        <h1 className="text-2xl  font-medium text-slate-900">FILTERS</h1>
        <div className="border border-slate-400 lg:w-60 md:w-24  p-4 mt-2">
          <h1 className="text-xl font-medium text-slate-900">Brands</h1>
          <div className="flex flex-col justify-center mt-2">
            <div className="w-full flex flex-col ">
              <label className="text-lg text-slate-700 font-light cursor-pointer">
                <input
                  onChange={toggleBrandFilter}
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value="Nike"
                />{" "}
                Nike
              </label>
              <label className="text-lg text-slate-700 font-light cursor-pointer">
                <input
                  onChange={toggleBrandFilter}
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value="New Balance"
                />{" "}
                New Balance
              </label>
              <label className="text-lg text-slate-700 font-light cursor-pointer">
                <input
                  onChange={toggleBrandFilter}
                  className="w-3 cursor-pointer"
                  type="checkbox"
                  value="Adidas"
                />{" "}
                Adidas
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* right product section an filter  */}
      <div className="w-full h-auto mt-10 mr-16">
        <div className="flex justify-between">
          <div>
            <OnlyTitle text1={"ALL"} text2={"COLLECTIONS"} fontSize={"3xl"} />
          </div>
          <div className="mr-10 mt-5">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-40 border border-slate-400 p-2 mt-5"
              name=""
              id=""
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>
        <div className="w-full h-auto">
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-5 mt-5 w-11/12 mx-auto">
            {filterProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
