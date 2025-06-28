import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContex";
const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [topLatest, setTopLatest] = useState(products);

  useEffect(() => {
    setTopLatest(products.slice(0, 10));
  }, [products]);

  return (
    <div>
      <div className="sm:w-11/12 sm:mx-auto ml-10">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-5 mt-5 sm:w-11/12 w-full mx-auto">
          {topLatest.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
