import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContex";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const bestSeller = products.slice(0, 5);
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <div className="grid sm:grid-cols-5 grid-cols-2 md:grid-cols-5 gap-5 mt-5 w-11/12 mx-auto">
          {bestSeller.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
