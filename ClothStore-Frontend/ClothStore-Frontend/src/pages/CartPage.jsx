import React, { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
    const navigate = useNavigate()
    const [productID,setProductID] = useState([])
  const {
    cartProduct,
    setCartProduct,
    currentUser,
    isLoggedIn,
    backendURL,
    products,
    subtotal, 
    setSubtotal
  } = useContext(userContext)

  const [cartItemsValue, setCartItemsValue] = useState(
    cartProduct || []
  )

  const [quantity, setQuantity] = useState([])

  useEffect(() => {

    setCartItemsValue(cartProduct || [])

  }, [cartProduct])

  useEffect(() => {

    const quantities = cartItemsValue.map(
      (item) => item.quantity || 1
    )

    setQuantity(quantities)

  }, [cartItemsValue])

  useEffect(() => {

    const total = cartItemsValue.reduce(
      (acc, item, index) =>
        acc + item.price * (quantity[index] || 1
        ),
      0
    )

    setSubtotal(total)
    localStorage.setItem("subtotal",total)

  }, [quantity, cartItemsValue])

  const handleCartItems = async()=>{
    if(isLoggedIn){
      try {
        const userID = currentUser._id
        const response = await axios.post(
          backendURL+"/api/user/listProduct",
          {
            userID
          }
        )
        if(response.data.message === "Succesful"){
          const cartProducts = response.data.data.map((cartItem) => {
            const product = products.find(
              (p) => p._id === cartItem.productID
            );          
            return {
              ...product,
              quantity: cartItem.quantity,
              selectedSize: cartItem.size,
              cartItemID: cartItem._id
            };
          });
          setCartItemsValue(cartProducts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(()=>{
    handleCartItems()
  },[currentUser,products])

  const [shipping, setShipping] = useState(10)

  const handelTrash = async(item,index)=>{
    if(isLoggedIn){
      const userID = currentUser._id
      const productID = item._id
      const response = await axios.post(
        backendURL+'/api/user/cartRemove',
        {
          userID,
          productID
        }
      )
    }

    const updatedCart = cartItemsValue.filter(
      (cartItem) => !(
        cartItem._id === item._id &&
        cartItem.selectedSize === item.selectedSize
      )
    )
    setCartItemsValue(updatedCart)
    setCartProduct(updatedCart)
  }

  const handleProductQuantityNegative = async(item,index)=>{
    if(isLoggedIn){
      const userID = currentUser._id
      const productID = item._id
      const quantity = item.quantity
      const size = item.selectedSize
      const response = await axios.post(
        backendURL+"/api/user/quantity",
        {
          userID,
          productID,
          size,
          quantity
        }
      )
    }

    const updatedCart = cartItemsValue.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1
          }
        : item
    )
    setCartItemsValue(updatedCart)
    setCartProduct(updatedCart)
  }
  const handleProductQuantityPositive = async(item,index)=>{
    if(isLoggedIn){
      const userID = currentUser._id
      const productID = item._id
      const quantity = item.quantity+1
      const size = item.selectedSize
      const response = await axios.post(
        backendURL+"/api/user/quantity",
        {
          userID,
          productID,
          size,
          quantity
        }
      )
    }

    const updatedCart = cartItemsValue.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    )
    setCartItemsValue(updatedCart)
    setCartProduct(updatedCart)
  }

  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white px-4 sm:px-6 md:px-0 py-2">

      <NavBar />

      {/* ================= PAGE HEADING ================= */}
      <div className="md:px-20 px-10 mt-13">

        <div className="flex items-center gap-4 mb-10">

          <h1 className="text-3xl sm:text-4xl font-black uppercase">
            Your Cart
          </h1>

          <div className="w-16 sm:w-24 h-[4px] bg-red-500 rounded-ful"></div>

        </div>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="flex flex-col xl:flex-row gap-16">

          {/* ================= LEFT CART ITEMS ================= */}
          <div className="flex-1 flex flex-col gap-3">

            {cartItemsValue.length === 0 ? (

              <div className="text-gray-400 text-xl font-semibold">
                Your cart is empty.
              </div>

            ) : (

              cartItemsValue.map((item, index) => (

                <div
                key={item.cartItemID}                
                className="bg-[#252527] max-w-[800px] border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:border-red-500/30 transition duration-500"
                >

                  {/* Product Image */}
                  <div className="w-full sm:w-[170px] h-[220px] sm:h-[170px] rounded-2xl overflow-hidden">

                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />

                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-2xl font-bold mb-3 leading-snug">
                        {item.name}
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 mb-3">

                        <p className="text-red-500 text-2xl font-black">
                          $
                          {item.price * item.quantity}
                        </p>

                        <span className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-sm text-gray-300">
                          Size: {item.selectedSize}
                        </span>

                      </div>

                    </div>

                    {/* Quantity + Delete */}
                    <div className="flex items-center justify-between flex-wrap gap-5">

                      {/* Quantity */}
                      <div className="flex items-center bg-[#1d1d1f] border border-white/10 rounded-2xl overflow-hidden">

                        <button
                          onClick={() => {
                            handleProductQuantityNegative(item,index)
                          }}
                          className="px-5 py-3 hover:bg-red-500/10 transition cursor-pointer"
                        >
                          -
                        </button>

                        <span className="px-6 py-3 border-x border-white/10">
                            {item.quantity}
                        </span>

                        <button
                          onClick={() => {
                            handleProductQuantityPositive(item,index)
                          }}
                          className="px-5 py-3 hover:bg-red-500/10 transition cursor-pointer cursor-pointer"
                        >
                          +
                        </button>

                      </div>

                      {/* Delete */}
                      <button
                        onClick={()=>handelTrash(item,index)}
                        className="cursor-pointer w-12 h-12 rounded-2xl bg-red-500/10 hover:bg-red-500 transition duration-300 flex items-center justify-center group"
                      >

                        <Trash2 className="w-5 h-5 text-red-500 group-hover:text-white transition cursor-pointer" />

                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

          {/* ================= CART TOTALS ================= */}
          <div className="w-full xl:w-[400px]">

            <div className="sticky top-10 bg-[#252527] border border-white/10 rounded-3xl p-8">

              {/* Heading */}
              <div className="flex items-center gap-4 mb-10">

                <h2 className="text-3xl font-black uppercase">
                  Cart Totals
                </h2>

                <div className="w-16 h-[4px] bg-red-500 rounded-full"></div>

              </div>

              {/* Totals */}
              <div className="flex flex-col gap-6 text-gray-300">

                <div className="flex justify-between border-b border-white/10 pb-4">

                  <p>Subtotal</p>
                  <p className="font-semibold text-white">
                    ${subtotal}
                  </p>

                </div>

                <div className="flex justify-between border-b border-white/10 pb-4">

                  <p>Shipping Fee</p>

                  <p className="font-semibold text-white">
                    ${shipping}
                  </p>

                </div>

                <div className="flex justify-between text-xl font-black text-white pt-2">

                  <p>Total</p>

                  <p className="text-red-500">
                    $
                    {subtotal === 0
                      ? 0
                      : subtotal + shipping}
                  </p>

                </div>

              </div>

              {/* Checkout Button */}
              <button
               onClick={()=>subtotal!==0?navigate('/place-order'):true}
               className="w-full mt-10 bg-red-500 hover:bg-red-600 transition duration-300 py-4 rounded-2xl font-bold text-lg cursor-pointer">

                PROCEED TO CHECKOUT

              </button>

              {/* Secure Checkout */}
              <p className="text-center text-gray-500 text-sm mt-5">
                Secure payment & fast delivery.
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-20">
        <Footer />
      </div>

    </section>
  );
}