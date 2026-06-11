import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import userContext from '../context/UserContext'
import { toast } from "react-toastify";
import axios from "axios";


function VerifyPage() {
    const {setSubtotal, backendURL,setCartProduct,currentUser
    } = useContext(userContext)
    const navigate = useNavigate()
    const [serachParams] = useSearchParams()

    useEffect(() => {
        const verifyPayment = async () => {
          try {
            const success = serachParams.get("success");
            const orderID = serachParams.get("orderID");
      
            const response = await axios.post(
              backendURL + "/api/order/verifyStripe",
              {
                success,
                orderID
              },
              {
                headers:{
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
              }
            );
      
            if (response.data.success) {
      
              setCartProduct([]);
              setSubtotal(0);
              localStorage.setItem("subtotal", 0);
      
              toast.success("Order Placed Successfully");
      
              navigate("/order");
      
            } else {
      
              toast.error("Payment Cancelled");
              navigate("/cart");
            }
      
          } catch (error) {
            console.log(error);
            navigate("/cart");
            toast.error("Payment Cancelled");
          }
        };
      
        verifyPayment();
      }, []);
  return (
    <div className="min-h-screen bg-[#1d1d1f] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        <h1 className="text-2xl font-bold">
          Verifying Payment...
        </h1>

        <p className="text-gray-400 mt-2">
          Please wait while we verify your payment.
        </p>
      </div>
    </div>
  )
}

export default VerifyPage