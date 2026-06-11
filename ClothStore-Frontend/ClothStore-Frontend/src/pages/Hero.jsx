import React from "react";
import {
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()
  return (
    <div>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 pt-10 lg:pt-0 mt-[30px]">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 z-10">
          <p className="text-4xl md:text-5xl font-serif italic text-gray-200 mb-4">
            Best quality
          </p>

          {/* Main Heading */}
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-extrabold uppercase text-red-500 leading-none tracking-tight drop-shadow-[0_5px_20px_rgba(255,0,0,0.4)]">
              Fashion
            </h1>

            {/* Outline Effect */}
            <h1 className="absolute top-1 left-1 text-6xl md:text-8xl font-extrabold uppercase text-transparent stroke-text">
              Fashion
            </h1>
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl uppercase tracking-[6px] text-gray-200">
            For Your Daily Style
          </h2>

          <p className="mt-6 text-gray-400 max-w-lg leading-relaxed">
            Discover premium streetwear and luxury clothing collections
            crafted for modern fashion lovers. Elevate your style with
            trendy outfits, oversized fits, and bold fashion essentials.
          </p>

          {/* Price */}
          {/* <div className="mt-8">
            <h3 className="text-4xl font-bold">$125</h3>
          </div> */}

          {/* Button */}
          <button onClick={()=>navigate('/Collection')} className="mt-6 cursor-pointer bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-full flex items-center gap-2 text-lg font-semibold shadow-[0_10px_30px_rgba(255,0,0,0.35)]">
            Shop Now
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Warranty */}
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center font-bold text-xl">
              2
            </div>

            <div>
              <p className="text-sm text-gray-300">
                Best premium clothing
              </p>

              <h4 className="font-bold uppercase">
                2 Years Warranty
              </h4>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-20 lg:mt-0">
          {/* BIG RED BACKGROUND SHAPE */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-[100px] blur-[2px] rotate-[-12deg] opacity-90"></div>

          {/* CLOTHING IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
            alt="Fashion Model"
            className="relative z-10 w-[500px] h-[600px] lg:w-[650px] object-cover drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] rounded-3xl mt-[20px]"
          />

          {/* Floating Circle */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* SIDE NUMBERS */}
        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-6 text-gray-400 text-xl">
          <span className="text-white">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>

        {/* BIG BACKGROUND TEXT */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 className="text-[180px] font-black uppercase text-white/[0.03] rotate-[-25deg] select-none">
            FastZone
          </h1>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
        }
      `}</style>
    </div>
  );
}