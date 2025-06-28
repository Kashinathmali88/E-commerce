import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContex";

function ProductItem({ product }) {
  const { _id, name, price, image } = product;
  const { currency } = useContext(ShopContext);

  return (
    <div>
      <Link to={`/products/${_id}`}>
        <div className="overflow-hidden">
          <img
            className="hover:scale-107 transition ease-in-out overflow-hidden"
            src={image[0]}
            alt=""
          />
          <p className="sm:text-lg text-2xl font-bold">{name}</p>
          <p className="sm:text-md text-xl font-medium text-slate-500">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
