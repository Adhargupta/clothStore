import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {backendURL} = useContext(userContext)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(()=>{
    // confirmPassword!==password?toast.error("confirm password is not same as password"):null
  })

  const navigate = useNavigate()

  const handleCreateAccount = async (e) => {
    e.preventDefault();
  
    if (confirmPassword !== password) {
      toast.error("Confirm password does not match");
      return;
    }
  
    try {
      const response = await axios.post(
        `${backendURL}/api/user/register`,
        {
          email,
          password,
          fullName,
        }
      );
  
      if (response.data.success) {
        toast.success("Register completed");
        setEmail('')
        setPassword('')
        setFullName('')
        setConfirmPassword('')
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#1d1d1f] flex items-center justify-center px-4 relative overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#252527]/80 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-red-500/40 hover:bg-[#2d2d2f] transition-all duration-300 cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />

        <span className="text-sm font-medium">
          Back
        </span>
      </button>

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-red-500/15 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-red-500/10 blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="w-full max-w-sm bg-[#252527] border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

            <UserPlus className="w-6 h-6 text-red-500" />

          </div>

          <div>
            <h1 className="text-2xl font-black text-white">
              FASTZONE
            </h1>

            <p className="text-red-500 text-[11px] tracking-[3px] uppercase">
              Create Account
            </p>
          </div>

        </div>

        {/* Heading */}
        <div className="mb-6">

          <h2 className="text-3xl font-black text-white">
            Join Us
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Create your account and start shopping.
          </p>

        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleCreateAccount}>
          {/* Name */}
          <input
            type="text"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-3 text-white outline-none transition"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-3 text-white outline-none transition"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-3 text-white outline-none transition"
          />

          {/* Confirm Password */}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full bg-[#1d1d1f] border border-white/10 focus:border-red-500 rounded-2xl px-4 py-3 text-white outline-none transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl text-white font-bold cursor-pointer shadow-lg shadow-red-500/20"
          >
            Create Account
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-px bg-white/10"></div>

          <span className="text-gray-500 text-xs">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"></div>

        </div>

        {/* Login */}
        <div className="text-center">

          <p className="text-gray-400 text-sm">

            Already have an account?{" "}

            <button
              onClick={()=>navigate('/login')}
              type="button"
              className="text-red-500 hover:text-red-400 font-semibold cursor-pointer"
            >
              Login
            </button>

          </p>

        </div>

      </div>
    </section>
  );
}