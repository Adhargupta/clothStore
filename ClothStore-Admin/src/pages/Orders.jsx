import React from "react";
import { PackagePlus, ClipboardList, ShoppingBag, Package } from "lucide-react";
import LeftMenu from "../component/LeftMenu";
import SignOut from "../component/SignOut";
import { backendURL } from "../context/ProvideContext";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(userContext);
  const [status, setStatus] = useState();

  const fetchingOrderData = async () => {
    try {
      const response = await axios.get(backendURL + "/api/order/orderList", {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        setOrders(response.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchingOrderData();
  }, []);

  const updateStatus = async (e, order) => {
    try {
      const status = e.target.value;
      const data = {
        orderID: order._id,
        status: status,
      };

      const response = await axios.post(
        backendURL + "/api/order/updateOrder",
        data,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        await fetchingOrderData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white flex">
      {/* ================= SIDEBAR ================= */}
      <LeftMenu />

      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-8 px-4 sm:px-6 md:px-20">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase">
              Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and track all customer orders.
            </p>
          </div>

          <SignOut />
        </div>

        {/* ================= ORDERS ================= */}
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#252527] border border-white/10 hover:border-red-500/30 transition duration-500 rounded-3xl p-5"
            >
              <div className="flex flex-col xl:flex-row justify-between gap-8">
                {/* LEFT SIDE */}
                <div className="flex-1">
                  {/* Products */}
                  <div className="flex flex-col gap-4">
                    {order.products.map((product) => (
                      <div
                        key={product._id}
                        className="flex gap-4 items-center border-b border-white/5 pb-4 last:border-none last:pb-0"
                      >
                        <div className="w-[70px] h-[70px] rounded-xl overflow-hidden bg-[#1d1d1f] border border-white/10 flex-shrink-0">
                          <img
                            src={product.image?.[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>

                          <div className="flex flex-wrap gap-3 text-gray-400 text-sm mt-1">
                            <span>Qty: {product.quantity}</span>
                            <span>•</span>
                            <span>Size: {product.selectedSize}</span>
                            <span>•</span>
                            <span>${product.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer */}
                  <div className="mt-6">
                    <h3 className="font-bold text-md">{order.fullName}</h3>

                    <p className="text-gray-400 leading-relaxed mt-1">
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.country},{" "}
                      {order.address.zipCode}
                    </p>

                    <p className="text-gray-400 mt-1">{order.contact}</p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="xl:min-w-[260px] flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">
                        Order ID:
                      </span>{" "}
                      {order._id.slice(-8)}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Items:</span>{" "}
                      {order.products.length}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Method:</span>{" "}
                      {order.paymentMethod}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Payment:</span>{" "}
                      {order.payment ? "Paid" : "Pending"}
                    </p>

                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Date:</span>{" "}
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <h2 className="text-2xl font-black text-red-500">
                      ${order.amount}
                    </h2>

                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(e, order)}
                      className="bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-3 outline-none cursor-pointer"
                    >
                      <option>Order placed</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Out For Deliver</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
