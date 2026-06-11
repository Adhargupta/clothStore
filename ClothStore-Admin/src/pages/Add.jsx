import React, { useContext, useState } from "react";
import {
  ImagePlus,
} from "lucide-react";
import LeftMenu from "../component/LeftMenu";
import { useEffect } from "react";
import axios from 'axios'
import SignOut from "../component/SignOut";
import { backendURL } from "../context/ProvideContext";
import userContext from "../context/userContext";
import { toast } from "react-toastify";

export default function Add() {
  const {token}=useContext(userContext)

  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState()
  const [productCategory, setProductCategory] = useState("Men") 
  const [productSubCategory, setProductSubCategory] = useState("Topwear") 
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [images, setImages] = useState([null, null, null, null])

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleEvent = async(e)=>{
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("name",productName)
      formData.append("description",productDescription)
      formData.append("price",productPrice)
      formData.append("category",productCategory)
      formData.append("subCategory",productSubCategory)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("bestSeller",bestSeller)
      images[0]&&formData.append("image1",images[0])
      images[1]&formData.append("image2",images[1])
      images[2]&formData.append("image3",images[2])
      images[3]&formData.append("image4",images[3])

      const res = await axios.post(
        backendURL+"/api/product/add",
        formData,
        {headers:{token}}
      )
      if (res.data.success) {
        toast.success(res.data.message)
        setProductName("")
        setProductDescription("")
        setProductPrice()
        setProductCategory("Men")
        setProductSubCategory("Topwear")
        setBestSeller(false)
        setSizes([])
        setImages([null,null,null,null])
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white flex">

      {/* ================= SIDEBAR ================= */}
      
        <LeftMenu/>
      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex-1 px-4 sm:px-6 md:px-20 py-10">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase">
              Add Product
            </h1>
            <p className="text-gray-500 mt-2">
              Upload and manage your products easily.
            </p>
          </div>
          <SignOut/>
        </div>
        {/* ================= FORM CONTAINER ================= */}
        <div className="bg-[#252527] border border-white/10 rounded-3xl p-4 sm:p-4 max-w-5xl">
          {/* ================= IMAGE UPLOAD ================= */}
          <div className="mb-8">
            <p className="text-lg font-semibold mb-5">
              Upload Images
            </p>
            <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
            <label
              key={index}
              className="w-[110px] h-[110px] rounded-2xl border border-dashed border-white/15 hover:border-red-500 transition bg-[#1d1d1f] flex flex-col items-center justify-center gap-2 cursor-pointer group overflow-hidden"
            >
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="w-7 h-7 text-gray-500 group-hover:text-red-500 transition" />
                  <p className="text-sm text-gray-500">
                    Upload
                  </p>
                </>
              )}
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? e.target.files[0] : item
                    )
                  )
                }
              />
            </label>
            ))}
            </div>
          </div>

          {/* ================= PRODUCT NAME ================= */}
          <div className="mb-6">

            <p className="text-lg font-semibold mb-3">
              Product Name
            </p>

            <input
              type="text"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
              placeholder="Type here..."
              className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none transition"
            />

          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="mb-6">

            <p className="text-lg font-semibold mb-3">
              Product Description
            </p>

            <textarea
              rows={4}
              value={productDescription}
              onChange={(e)=>setProductDescription(e.target.value)}
              placeholder="Write content here..."
              className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none transition resize-none"
            ></textarea>

          </div>

          {/* ================= CATEGORY ROW ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {/* Category */}
            <div>

              <p className="text-lg font-semibold mb-3">
                Category
              </p>

              <select onClick={(e)=>setProductCategory(e.target.value)} className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-4 outline-none transition">

                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>

              </select>

            </div>

            {/* Subcategory */}
            <div>

              <p className="text-lg font-semibold mb-3">
                Sub Category
              </p>

              <select onClick={(e)=>setProductSubCategory(e.target.value)} className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-4 outline-none transition">

                <option>Topwear</option>
                <option>Bottomwear</option>
                <option>Winterwear</option>

              </select>

            </div>

            {/* Price */}
            <div>

              <p className="text-lg font-semibold mb-3">
                Product Price
              </p>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  $
                </span>

                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="25"
                  className="w-full pl-8 bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-4 outline-none transition"
                />
            </div>

            </div>

          </div>

          {/* ================= SIZES ================= */}
          <div className="mb-8">

            <p className="text-lg font-semibold mb-4">
              Product Sizes
            </p>

            <div className="flex flex-wrap gap-4">

              {["S", "M", "L", "XL", "XXL"].map((size) => (

                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-6 py-3 rounded-2xl border transition duration-300 font-semibold cursor-pointer ${
                    sizes.includes(size)
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-[#1d1d1f] border-white/10 hover:border-red-500"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* ================= BESTSELLER ================= */}
          <div className="flex items-center gap-3 mb-8">

          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            className="w-5 h-5 accent-red-500 cursor-pointer"
          />
            <p className="text-gray-300">
              Add to bestseller
            </p>

          </div>

          {/* ================= BUTTON ================= */}
          <div className="flex justify-center">
            <button
            onClick={(e)=>handleEvent(e)}
            className="bg-red-500 hover:bg-red-600 transition duration-300 px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer">

              ADD PRODUCT

            </button>
          </div>

        </div>

      </div>

    </section>
  );
}