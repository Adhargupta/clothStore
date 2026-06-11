import React, { useContext, useEffect, useState } from "react";
import { User } from "lucide-react";
import axios from "axios";
import userContext from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function UserLogin() {
  const {backendURL, setIsLoggedIn, currentUser, setCurrentUser} = useContext(userContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(
        backendURL+'/api/user/login',
        {
          email: email,
          password: password,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setIsLoggedIn(true)
      
        const { user, accessToken, refreshToken } = response.data.data  // ✅ destructure from .data.data
      
        const userData = {
          _id: user._id,
          name: user.fullName,
          email: user.email,
          accessToken,
          refreshToken,
          cartList: user.cartList,
        }
      
        setCurrentUser(userData)
        localStorage.setItem("currentUser", JSON.stringify(userData))
      
        setEmail('')
        setPassword('')
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#1d1d1f]">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#252527]/80 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-red-500/40 hover:bg-[#2d2d2f] transition-all duration-300 cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />

        <span className="text-sm font-medium">
          Back
        </span>
      </button>

      <div className="relative overflow-hidden bg-[#1d1d1f]">
      {/* ================= BACKGROUND GLOW ================= */}
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-red-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-red-500/10 blur-[120px] rounded-full"></div>

        {/* ================= LOGIN CARD ================= */}
        <div className="w-full max-w-md bg-[#252527]/95 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 sm:p-6 shadow-2xl relative z-10">

          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

              <User className="w-7 h-7 text-red-500" />

            </div>

            <div>

              <h1 className="text-3xl font-black text-white tracking-wide">
                FASTZONE
              </h1>

              <p className="text-red-500 uppercase tracking-[4px] text-xs mt-1">
                User Login
              </p>

            </div>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <h2 className="text-4xl font-black text-white mb-3">
              Welcome Back
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Login to continue shopping your favorite fashion collections.
            </p>

          </div>

          {/* ================= FORM ================= */}
          <form className="flex flex-col gap-5">

            {/* Email */}
            <div>

              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 text-white outline-none transition duration-300"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 text-white outline-none transition duration-300"
              />

            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-1">

              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">

                <input
                  type="checkbox"
                  className="accent-red-500 cursor-pointer"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-sm text-gray-400 hover:text-red-500 transition cursor-pointer"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={(e)=>handleLogin(e)}
              className="mt-3 bg-red-500 hover:bg-red-600 transition duration-300 py-4 rounded-2xl text-lg font-bold text-white cursor-pointer shadow-lg shadow-red-500/20"
            >

              Login

            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-[1px] bg-white/10"></div>

            <p className="text-gray-500 text-sm">
              OR
            </p>

            <div className="flex-1 h-[1px] bg-white/10"></div>

          </div>

          {/* Create Account */}
          <div className="text-center">

            <p className="text-gray-400">

              Don't have an account?{" "}

              <button
              onClick={()=>navigate('/register')}
              className="text-red-500 hover:text-red-400 font-semibold transition cursor-pointer">
                Create Account
              </button>

            </p>

          </div>

        </div>
      </div>
    </section>
  );
}