import React, { useContext, useEffect, useState } from "react";
import {
  PackagePlus,
  ClipboardList,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import LeftMenu from "../component/LeftMenu";
import SignOut from "../component/SignOut";
import axios from "axios";
import { backendURL } from "../context/ProvideContext";
import { toast } from "react-toastify";
import userContext from "../context/userContext";

export default function List() {
  const {token}=useContext(userContext)
  const [productListed, setProductListed] = useState([])

  const fetchList = async()=>{
    try {
      const response = await axios.get(
        backendURL+"/api/product/list",
      )
      const productInfo = response.data.data
      setProductListed(productInfo)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchList()
  },[])

  const handleRemoveItem = async(id) => {

    try {
      const response = await axios.post(
        backendURL + "/api/product/remove",
        { productID: id },
        {
          headers: { token }
        }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white flex">

      {/* ================= SIDEBAR ================= */}
      <LeftMenu/>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex-1 px-4 sm:px-6 md:px-20 py-9.5">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase">
              Product List
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your store products.
            </p>

          </div>

          <SignOut/>

        </div>

        {/* ================= PRODUCT TABLE ================= */}
        <div className="bg-[#252527] border border-white/10 rounded-3xl overflow-hidden">

          {/* Header */}
          <div className="hidden md:grid grid-cols-[100px_2fr_1fr_1fr_100px] border-b border-white/10 px-6 py-5 text-gray-400 font-semibold">

            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p className="text-center">Action</p>

          </div>

          {/* Products */}
          <div className="flex flex-col">

            {productListed.map((item,index) => (

              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-[100px_2fr_1fr_1fr_100px] gap-5 md:gap-0 items-center px-5 md:px-6 py-3 border-b border-white/10 hover:bg-white/[0.03] transition"
              >

                {/* Image */}
                <div className="w-[80px] h-[90px] rounded-2xl overflow-hidden">

                  <img
                    src={item.image[0]?item.image[0]:"https://placehold.co/400x500/1d1d1f/ffffff?text=No+Image"}
                    alt=""
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />

                </div>

                {/* Name */}
                <div>

                  <h2 className="text-lg font-semibold leading-snug">
                    {item.name}
                  </h2>

                </div>

                {/* Category */}
                <div>

                  <p className="text-gray-400">
                    {item.category}
                  </p>

                </div>

                {/* Price */}
                <div>

                  <p className="text-red-500 font-black text-xl">
                    ${item.price}
                  </p>

                </div>

                {/* Delete */}
                <div className="flex md:justify-center">

                  <button
                   onClick={()=>handleRemoveItem(productListed[index]._id)}
                   className="w-11 h-11 rounded-2xl bg-red-500/10 hover:bg-red-500 transition duration-300 flex items-center justify-center group cursor-pointer">

                    <Trash2 className="w-5 h-5 text-red-500 group-hover:text-white transition" />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}