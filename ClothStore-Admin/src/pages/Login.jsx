import React, { useContext, useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import axios from "axios";
import userContext from "../context/userContext";
import { backendURL } from "../context/ProvideContext";
import { toast } from "react-toastify";

export default function Login() {
    const {setToken} = useContext(userContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleEvent = async(e)=>{
        e.preventDefault()

        try {
            const res = await axios.post(
                backendURL+"/api/user/admin",
                {
                    email: email,
                    password: password,
                }
            )
            if (res.data.success) {
                localStorage.setItem("token", res.data.data)

                setToken(res.data.data)                
                setEmail("")
                setPassword("")
              }else{
                toast.error("Invalid details")
              }
        } catch (error) {
            console.log(error);
            toast.error("Invalid details")
        }
    }
  return (
    <section className="min-h-screen bg-[#1d1d1f] flex items-center justify-center px-4 relative overflow-hidden">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-red-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-red-500/10 blur-[120px] rounded-full"></div>

      {/* ================= LOGIN CARD ================= */}
      <div className="w-full max-w-md bg-[#252527]/95 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl relative z-10">

        {/* Logo */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

            <ShieldCheck className="w-7 h-7 text-red-500" />

          </div>

          <div>

            <h1 className="text-3xl font-black text-white tracking-wide">
              FASTZONE
            </h1>
            <p className="text-red-500 uppercase tracking-[4px] text-xs mt-1">
              Admin Panel
            </p>
          </div>

        </div>

        {/* Heading */}
        <div className="mb-8">

          <h2 className="text-4xl font-black text-white mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Login to manage products, orders and store settings.
          </p>

        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleEvent} className="flex flex-col gap-5">

          {/* Email */}
          <div>

            <label className="block text-sm text-gray-300 mb-3 font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="admin@example.com"
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
              placeholder="••••••••••"
              className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 text-white outline-none transition duration-300"
            />

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mt-1">

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
            className="mt-3 bg-red-500 hover:bg-red-600 transition duration-300 py-4 rounded-2xl text-lg font-bold text-white cursor-pointer shadow-lg shadow-red-500/20"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
}