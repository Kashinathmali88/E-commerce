import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContex";
import { BsFillStarFill } from "react-icons/bs";
import SubscribeNow from "../components/SubscribeNow";
import RelatedProducts from "../components/RelatedProducts";

function Products() {
  const { productId } = useParams();
  const { products, currency, backendUrl, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState({});
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [brand, setBrand] = useState("");

  const fetchProductData = async () => {
    products.filter((item) => {
      if (item._id.toString() === productId) {
        setProductData(item);
        setImage(item.image[0]);
        setAllImages(item.image);
        setSizes(item.sizes);
        setBrand(item.brand);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return (
    <>
      <div className="w-10/12 h-[100vh] sm:mt-10 mt-3 mx-auto sm:flex sm:justify-between flex-row">
        {/* left image section  */}
        <div className="w-1/2 h-auto">
          <div className="sm:w-[90%] w-[400px] mx-auto sm:h-[420px] h-auto mt-7">
            <div className="w-full min-h-20">
              <img
                className="w-full h-full object-center"
                src={`${image}`}
                alt=""
              />
            </div>
            <div className="w-full h-full mt-5">
              <div className="overflow-x-auto whitespace-nowrap p-4 scroll-smooth">
                {allImages.map((img, index) => (
                  <img
                    onClick={() => {
                      setImage(img);
                    }}
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="inline-block w-[40%] h-auto mr-4 rounded-lg shadow-lg cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* right discritpiton section add to cart */}
        <div className="w-2/3 h-96 mt-11">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex gap-2 items-center mt-2">
            <BsFillStarFill className=" text-orange-400" />
            <BsFillStarFill className=" text-orange-400" />
            <BsFillStarFill className=" text-orange-400" />
            <BsFillStarFill className=" text-orange-400" />
            <BsFillStarFill className=" text-orange-400" />
            <span className="font-light text-slate-600">(112)</span>
          </div>

          <p className="pt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="pt-5 text-gray-500 w-1/2 md:4/5">
            {productData.description}
          </p>
          <p className="text-gray-700 text-sm pt-5 mb-3">Select Size</p>
          <div className="flex gap-2">
            {sizes.map((size, index) => (
              <button
                onClick={() => setSelectedSize(size)}
                key={index}
                className={`py-2 px-4 bg-gray-200 cursor-pointer ${
                  selectedSize === size
                    ? "border bg-gray-500 text-slate-50 transition-all ease-out-in"
                    : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black cursor-pointer hover:bg-slate-900 text-white py-3 px-8 text-sm active:bg-gray-700 mt-5 mb-4 rounded-md"
          >
            ADD TO CART
          </button>
          <hr className="border-t-1 w-1/2 border-gray-400" />
          <div className="w-1/2 text-sm text-slate-600">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-60 sm:mt-0 w-auto h-auto">
        <RelatedProducts brand={brand} />
      </div>
      <div>
        <SubscribeNow />
      </div>
    </>
  );
}

export default Products;
