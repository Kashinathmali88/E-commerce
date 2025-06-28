import React, { useContext, useEffect, useState } from "react";
import OnlyTitle from "../components/OnlyTitle";
import { ShopContext } from "../context/ShopContex";
import ProductItem from "./ProductItem";

function RelatedProducts({ brand }) {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((item) => item.brand === brand);

      setRelatedProducts(productCopy);
    }
  }, [products, brand]);
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <OnlyTitle text1={"RELATED"} text2={"PRODUCTS"} fontSize={"2xl"} />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mt-5 w-11/12 mx-auto">
          {relatedProducts.slice(0, 5).map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
