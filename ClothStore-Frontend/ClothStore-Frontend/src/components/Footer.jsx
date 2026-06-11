import React from "react";
import {
  Camera,
  Heart,
  Globe,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1f] text-white pt-20 pb-8 px-6 md:px-16 border-t border-white/10">

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-16 border-b border-white/10">

        {/* ================= LOGO + ABOUT ================= */}
        <div className="lg:col-span-2">

          {/* Logo */}
          <h1 className="text-4xl font-black uppercase tracking-tight cursor-pointer">
            FAST<span className="text-red-500">ZONE</span>
          </h1>

          {/* Underline */}
          <div className="w-24 h-[4px] bg-red-500 rounded-full mb-6"></div>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed max-w-xl">
            FastZone brings modern streetwear and luxury fashion
            together with premium quality, bold designs, and
            trend-setting collections crafted for the next generation.
          </p>

          {/* ================= SOCIAL ICONS ================= */}
          <div className="flex items-center gap-5 mt-8">

            {/* Camera */}
            <div className="w-12 h-12 rounded-full bg-[#252527] border border-white/10 flex items-center justify-center hover:bg-red-500 transition duration-300 cursor-pointer">
              <Camera className="w-5 h-5" />
            </div>

            {/* Heart */}
            <div className="w-12 h-12 rounded-full bg-[#252527] border border-white/10 flex items-center justify-center hover:bg-red-500 transition duration-300 cursor-pointer">
              <Heart className="w-5 h-5" />
            </div>

            {/* Globe */}
            <div className="w-12 h-12 rounded-full bg-[#252527] border border-white/10 flex items-center justify-center hover:bg-red-500 transition duration-300 cursor-pointer">
              <Globe className="w-5 h-5" />
            </div>

            {/* Send */}
            <div className="w-12 h-12 rounded-full bg-[#252527] border border-white/10 flex items-center justify-center hover:bg-red-500 transition duration-300 cursor-pointer">
              <Send className="w-5 h-5" />
            </div>

          </div>
        </div>

        {/* ================= COMPANY LINKS ================= */}
        <div>
          <h2 className="text-2xl font-bold uppercase mb-8">
            Company
          </h2>

          <ul className="space-y-3 text-gray-400 pl-4">

            <li className="hover:text-red-500 transition cursor-pointer">
              Home
            </li>

            <li className="hover:text-red-500 transition cursor-pointer">
              About Us
            </li>

            <li className="hover:text-red-500 transition cursor-pointer">
              Collections
            </li>

            <li className="hover:text-red-500 transition cursor-pointer">
              New Arrivals
            </li>

            <li className="hover:text-red-500 transition cursor-pointer">
              Contact
            </li>

          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>

          <h2 className="text-2xl font-bold uppercase mb-8">
            Get In Touch
          </h2>

          <div className="space-y-3 pl-4 text-gray-400">
            <p>+91 98765 43210</p>
            <p>support@fastzone.com</p>
            <p>Mumbai, India</p>
          </div>

          {/* Newsletter */}
          <div className="mt-8">

            {/* <p className="mb-4 text-sm uppercase tracking-[4px] text-red-500">
              Subscribe
            </p>

            <div className="flex items-center bg-[#252527] rounded-full overflow-hidden border border-white/10">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-5 py-4 outline-none text-sm flex-1"
              />

              <button className="bg-red-500 hover:bg-red-600 transition px-6 py-4 font-semibold">
                Join
              </button>

            </div> */}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-gray-500 text-sm">
          © 2026 FastZone. All Rights Reserved.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500">

          <p className="hover:text-red-500 transition cursor-pointer">
            Privacy Policy
          </p>

          <p className="hover:text-red-500 transition cursor-pointer">
            Terms & Conditions
          </p>

        </div>
      </div>
    </footer>
  );
}