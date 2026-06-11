import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { data, useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PayementPage() {
  const {
    subtotal,
    setSubtotal,
    backendURL,
    currentUser,
    isLoggedIn,
    cartProduct,
    setCartProduct,
    //  setOrderItem
  } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [productIDs, setProductIDs] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [address, setAddress] = useState({});
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState();

  useEffect(() => {
    setAddress({
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    });
    setFullName(`${formData.firstName} ${formData.lastName}`);
    setContact(formData.phone);
  }, [formData]);

  useEffect(() => {
    setProductIDs(cartProduct.map((item) => item._id));
  }, [cartProduct]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendURL + "/api/order/verifyRazorpay",
            response,
            {
              headers: {
                Authorization: `Bearer ${currentUser.accessToken}`,
              },
            }
          );

          if (data.success) {
            setLoading(false);

            setCartProduct([]);
            setSubtotal(0);

            localStorage.removeItem("cartProduct");
            localStorage.setItem("subtotal", 0);

            toast.success("Order Placed Successfully");

            navigate("/order");
          }
        } catch (error) {
          setLoading(false);

          toast.error("Payment Verification Failed");

          navigate("/cart");
        }
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
          toast.error("Payment Cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      setLoading(false);
      toast.error("Payment Failed");
    });

    rzp.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (subtotal > 0) {
      try {
        const orderData = {
          userID: currentUser._id,
          products: cartProduct.map((item) => ({
            productID: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
          })),
          amount: subtotal,
          address,
          fullName,
          contact,
        };
        if (!paymentMethod) {
          toast.error("Select a payment method");
          return;
        }
        switch (paymentMethod) {
          case "COD":
            const response = await axios.post(
              backendURL + "/api/order/COD",
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
              }
            );
            if (response.data.success) {
              setCartProduct([]);
              setSubtotal(0);
              localStorage.setItem("subtotal", 0);
              navigate("/order");
              toast.success("Order Placed Successfully");
            } else {
              toast.error("Order Failed to Proceed");
            }
            break;

          case "Stripe":
            setLoading(true);
            const stripeResponse = await axios.post(
              backendURL + "/api/order/Stripe",
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
              }
            );
            if (stripeResponse.data.success) {
              setLoading(false);
              const { session_url } = stripeResponse.data;
              window.location.replace(session_url);
            } else {
              setLoading(false);
              toast.error("Order Failed to Proceed");
              console.log(stripeResponse.data.message);
            }
            break;

          case "Razorpay":
            setLoading(true);
            const razorPayResponse = await axios.post(
              backendURL + "/api/order/Razorpay",
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
              }
            );
            if (razorPayResponse.data.success) {
              initPay(razorPayResponse.data.order);
            }
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white">
      <div className="">
        <NavBar />
      </div>
      {/* ================= MAIN CONTAINER ================= */}
      <form action="" onSubmit={handlePlaceOrder}>
        <div className="flex flex-col xl:flex-row gap-17 max-w-5xl mx-auto px-2 sm:px-4 lg:px-0 py-6">
          {/* ================= DELIVERY INFORMATION ================= */}
          <div className="flex-1 mt-4">
            {/* Heading */}
            <div className="flex items-center gap-4 mb-10">
              <h1 className="text-3xl sm:text-4xl font-black uppercase">
                Delivery Information
              </h1>

              <div className="w-14 sm:w-20 h-[4px] bg-red-500 rounded-full"></div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  onChange={onChangeHandler}
                  name="firstName"
                  value={formData.firstName}
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                  required
                />

                <input
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                  required
                />
              </div>

              {/* Email */}
              <input
                onChange={onChangeHandler}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                required
              />

              {/* Street */}
              <input
                onChange={onChangeHandler}
                value={formData.street}
                type="text"
                name="street"
                placeholder="Street Address"
                className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
              />

              {/* City + State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  name="city"
                  type="text"
                  placeholder="City"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                />

                <input
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                  required
                />
              </div>

              {/* Zip + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  onChange={onChangeHandler}
                  name="zipCode"
                  value={formData.zipCode}
                  type="text"
                  placeholder="Zip Code"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                  required
                />

                <input
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  type="text"
                  placeholder="Country"
                  className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                  required
                />
              </div>

              {/* Phone */}
              <input
                name="phone"
                onChange={onChangeHandler}
                value={formData.phone}
                type="text"
                placeholder="Phone Number"
                className="w-full bg-[#1f1f21] border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 outline-none transition text-sm"
                required
              />
            </div>
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="w-full xl:w-[420px]">
            {/* ================= CART TOTALS ================= */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-5 shadow-xl">
              {/* Heading */}
              <div className="flex items-center gap-4 mb-8 justify-center">
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  Cart Totals
                </h2>

                <div className="w-14 h-[4px] bg-red-500 rounded-full"></div>
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-5 text-gray-300">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <p>Subtotal</p>

                  <p className="font-semibold text-white">${subtotal}</p>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-4">
                  <p>Shipping Fee</p>

                  <p className="font-semibold text-white">$10</p>
                </div>

                <div className="flex justify-between text-xl font-black text-white pt-2">
                  <p>Total</p>

                  <p className="text-red-500">${subtotal + 10}</p>
                </div>
              </div>
            </div>

            {/* ================= PAYMENT METHOD ================= */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-3 mt-4 shadow-xl">
              {/* Heading */}
              <div className="items-center gap-4 mb-8 flex justify-center">
                <h2 className="text-2xl font-black uppercase">
                  Payment Method
                </h2>

                <div className="w-14 h-[4px] bg-red-500 rounded-full"></div>
              </div>

              {/* Payment Options */}
              <div className="flex flex-col gap-4">
                {/* Stripe */}
                <div
                  onClick={() => setPaymentMethod("Stripe")}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "Stripe"
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === "Stripe"
                          ? "bg-red-500 border-red-500"
                          : "border-gray-500"
                      }`}
                    ></div>

                    <p className="font-semibold">Stripe</p>
                  </div>

                  <p className="text-gray-500 text-sm">Secure Payment</p>
                </div>

                {/* Razorpay */}
                <div
                  onClick={() => setPaymentMethod("Razorpay")}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "Razorpay"
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === "Razorpay"
                          ? "bg-red-500 border-red-500"
                          : "border-gray-500"
                      }`}
                    ></div>

                    <p className="font-semibold">Razorpay</p>
                  </div>

                  <p className="text-gray-500 text-sm">UPI / Cards</p>
                </div>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "COD"
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/10 hover:border-red-500/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === "COD"
                          ? "bg-red-500 border-red-500"
                          : "border-gray-500"
                      }`}
                    ></div>

                    <p className="font-semibold">Cash On Delivery</p>
                  </div>

                  <p className="text-gray-500 text-sm">Pay Later</p>
                </div>
              </div>

              {/* Button */}
              <button
                // onClick={()=>navigate('/order')}
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-red-500 hover:bg-red-600 transition-all duration-300 py-3 rounded-xl font-semibold tracking-wide cursor-pointer shadow-lg shadow-red-500/20"
              >
                {loading ? "Redirecting ..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="">
        <Footer />
      </div>
    </section>
  );
}
