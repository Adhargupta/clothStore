import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Product() {
  const {
    value,
    productDetail,
    setProductDetail,
    sizeItem,
    setSizeItem,
    cartProduct,
    setCartProduct,
    backendURL,
    isLoggedIn,
    currentUser,
  } = useContext(userContext);
  const [mainImage, setMainImage] = useState();
  const [selectSmallImage, setSelectSmallImage] = useState(
    productDetail.image[0]
  );
  const [selectedSize, setSelectedSize] = useState(productDetail.sizes[0]);

  const navigate = useNavigate();
  useEffect(() => {
    setSizeItem(selectedSize);
  }, [selectedSize]);

  useEffect(() => {
    setMainImage(undefined);
    setSelectSmallImage(productDetail.image[0]);
  }, [productDetail]);

  const productProfile = (products) => {
    navigate(`/product/${products._id}`);
    setProductDetail(products);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCart = async () => {
    if (isLoggedIn) {
      try {
        const productID = productDetail._id
        const userID = currentUser._id
        const res = await axios.post(
          backendURL + '/api/user/cartlist',
          { userID, productID,size:selectedSize },
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}` // ✅ send token
            }
          }
        )
        if(res.data.success===true){
          toast.success("Product added to cart")
        }
      } catch (error) {
        console.error("Cart sync failed:", error.response?.data || error.message)
      }
    }
    setCartProduct((prev) => {
      const existingItem = prev.find(
        (item) =>
          item._id === productDetail._id && item.selectedSize === selectedSize 
      );
      if (existingItem) {
        return prev.map((item) =>
          item._id === productDetail._id && item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...productDetail,
          quantity: 1,
          selectedSize,
        },
      ];
    });
  }
  

  return (
    <section className="bg-[#1d1d1f] text-white px-0 sm:px-0 md:px-0 py-2">
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 mt-6 px-10 md:px-20">
        {/* ================= LEFT IMAGE SECTION ================= */}
        <div className="flex flex-col-reverse sm:flex-row gap-5 flex-1">
          {/* Small Images */}
          <div className="flex sm:flex-col gap-4">
            {productDetail.image.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectSmallImage(item)}
                className={`w-20 h-24 bg-[#252527] border border-white/10 overflow-hidden cursor-pointer hover:border-red-500/40 transition p-0.5 rounded-2xl
            ${
              selectSmallImage === item
                ? "bg-red-800 border-red-500 text-white"
                : "bg-[#252527] border-white/10 hover:border-red-500 hover:bg-red-500/10"
            }
            `}
              >
                <img
                  onClick={() => setMainImage(item)}
                  src={productDetail.image[index]}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-[490px] md:h-[558px] flex-1 bg-[#252527] border border-white/10 rounded-3xl overflow-hidden">
            <img
              src={mainImage === undefined ? productDetail.image[0] : mainImage}
              alt=""
              className=" w-full h-full object-cover hover:scale-105 transition duration-700 object-top"
            />
          </div>
        </div>

        {/* ================= RIGHT CONTENT SECTION ================= */}
        <div className="flex-1 max-w-xl">
          {/* Category */}
          <p className="text-red-500 uppercase tracking-[5px] text-sm mb-4">
            FastZone Exclusive
          </p>

          {/* Product Title */}
          <h1 className="text-3xl sm:text-3xl font-black leading-tight mb-2">
            {productDetail.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex text-red-500 text-lg">★ ★ ★ ★ ☆</div>

            <p className="text-gray-400 text-sm">(122 Reviews)</p>
          </div>

          {/* Price */}
          <h2 className="text-4xl font-black text-red-500 mb-5">
            {`$${productDetail.price}`}
          </h2>

          {/* Description */}
          <p className="text-gray-400 leading-loose mb-6">
            {productDetail.description}
          </p>

          {/* Sizes */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-5">Select Size</h3>

            <div className="flex flex-wrap gap-4">
              {productDetail.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`bg-[#252527] cursor-pointer border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition duration-300 px-4.5 py-2.5 rounded-2xl font-semibold
              ${
                selectedSize === size
                  ? "bg-red-400 border-red-500 text-white"
                  : "bg-[#252527] border-white/10 hover:border-red-500 hover:bg-red-500/10"
              }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleCart}
            className="bg-red-500 hover:bg-red-600 transition duration-300 px-5 py-3 rounded-2xl font-bold text-md mb-10 cursor-pointer"
          >
            ADD TO CART
          </button>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/10 mb-8"></div>

          {/* Policies */}
          <div className="flex flex-col gap-4 text-gray-400 text-sm leading-relaxed">
            <p>✓ 100% Original product.</p>

            <p>✓ Cash on delivery available on this product.</p>

            <p>✓ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION + RELATED PRODUCTS ================= */}
      <div className="mt-28 px-15">
        {/* ================= TABS ================= */}
        <div className="border border-white/10 rounded-t-2xl overflow-hidden w-fit flex">
          <button className="bg-[#252527] px-8 py-4 text-white font-semibold border-r border-white/10">
            Description
          </button>

          <button className="bg-[#1d1d1f] px-8 py-4 text-gray-400 hover:text-white transition">
            Reviews (122)
          </button>
        </div>

        {/* ================= DESCRIPTION BOX ================= */}
        <div className="border border-white/10 rounded-b-3xl rounded-r-3xl p-6 md:p-8 bg-[#252527] text-gray-400 leading-loose text-[15px]">
          <p className="mb-6">
            Elevate your wardrobe with premium fashion pieces crafted for modern
            streetwear enthusiasts. Our collection combines comfort, luxury, and
            contemporary aesthetics to create outfits that stand out in every
            season.
          </p>

          <p>
            FastZone products are designed with high-quality fabrics, trendy
            oversized fits, and minimalist styling to match the vibe of modern
            fashion culture. Every piece is made to deliver both comfort and
            confidence in your everyday lifestyle.
          </p>
        </div>

        {/* ================= RELATED PRODUCTS HEADING ================= */}
        <div className="flex flex-col items-center justify-center mt-20 mb-16">
          <p className="text-red-500 uppercase tracking-[6px] text-sm mb-4">
            You May Also Like
          </p>

          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-black uppercase">
              Related Products
            </h1>

            <div className="w-16 sm:w-24 h-[4px] bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {value.products
            .filter(
              (items) =>
                items.category === productDetail.category &&
                items.subCategory === productDetail.subCategory &&
                items._id != productDetail._id
            )
            .slice(0, 5)
            .map((item, index) => (
              <div
                key={item._id}
                onClick={() => productProfile(item)}
                className="group bg-[#252527] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/40 transition duration-500 cursor-pointer w-full max-w-[260px]"
              >
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image[0]}
                    alt=""
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <h2 className="text-white text-lg font-semibold leading-relaxed mb-2 group-hover:text-red-500 transition duration-300">
                    {item.name}
                  </h2>

                  <p className="text-red-500 text-2xl font-black">
                    {`$${item.price}`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </section>
  );
}

export default Product;
