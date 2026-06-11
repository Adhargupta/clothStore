import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function Orders() {
  const {
      backendURL,
      currentUser,
      products,
      orders, 
      setOrders
   } = useContext(userContext)

  const orderPageInfo = async () => {
    try {
      const response = await axios.post(
        backendURL+'/api/order/orderInfo',
        {
          userID:currentUser._id
        },
        {
          headers:{
            Authorization: `Bearer ${currentUser.accessToken}`
          }
        }
      )
      if(response.data.success){
        setOrders(response.data.data)
      }
    } catch (err) {
      console.log("CATCH triggered:", err.name, err.message)
    }
  }
  useEffect(() => {
    if (currentUser?._id) {       // ← Add this guard
      orderPageInfo()
    }
  }, [currentUser])


  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white">
        <div className="">
            <NavBar/>
        </div>
      {/* ================= HEADING ================= */}
      <div className=" px-4 sm:px-6 md:px-10 lg:px-7 py-7">
      <div className="flex items-center gap-4 mb-10">

        <h1 className="text-3xl sm:text-4xl font-black uppercase">
          My Orders
        </h1>

        <div className="w-14 sm:w-20 h-[4px] bg-red-500 rounded-full"></div>

      </div>

      {/* ================= ORDERS LIST ================= */}
      <div className="flex flex-col gap-4 min-h-110">

        {orders.map((order) => 
          order.products.map((item,index)=>

          <div
             key={`${item._id}-${index}`}
            className="bg-[#252527] border border-white/10 hover:border-red-500/30 transition duration-500 rounded-3xl p-3 sm:p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >

            {/* ================= LEFT SECTION ================= */}
            <div className="flex gap-4 sm:gap-5">

              {/* Image */}
              <div className="w-[80px] h-[90px] sm:w-[90px] sm:h-[100px] rounded-2xl overflow-hidden bg-black/20 flex-shrink-0">

                <img
                  src={item.image?.[0]}
                  alt=""
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />

              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold leading-snug mb-2">
                {item.name}                
                </h2>

                {/* Price + Quantity + Size */}
                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base mb-2">

                  <p className="text-red-500 font-black text-lg">
                    ${order.amount}
                  </p>

                  <span className="text-gray-500">•</span>

                  <p className="text-gray-300">
                    Qty: {item.quantity}
                  </p>

                  <span className="text-gray-500">•</span>

                  <p className="text-gray-300">
                  Size: {item.selectedSize}                  
                  </p>

                </div>

                {/* Date + Payment */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">

                  <p>
                    Date: {new Date(order.date).toLocaleDateString()}                  
                  </p>

                  <span className="text-gray-500">•</span>

                  <p>
                    Method of Order: {order.paymentMethod}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= RIGHT SECTION ================= */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 lg:gap-12">

              {/* Status */}
              <div className="flex items-center gap-3 mr-12">

                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                {/* <div className="">{}</div> */}

                <p className="text-gray-300 font-medium">
                  {order.status}
                </p>

              </div>

              {/* Button */}
              <button className="border border-white/10 hover:border-red-500 hover:bg-red-500/10 transition duration-300 px-6 py-3 rounded-2xl font-semibold text-sm sm:text-base cursor-pointer">

                Track Order

              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
    <div className="">
        <Footer/>
    </div>
    </section>
  );
}