import React from "react";
import NavBar from "../components/NavBar";
import Subscribe from "./Subscribe";
import Footer from "../components/Footer";

export default function About() {
  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white overflow-hidden">
      <NavBar/>
      {/* ================= HEADING ================= */}
      <div className="bg-[#1d1d1f] text-white py-10 px-6 md:px-16 overflow-hidden">
        <div className="flex mb-0">
            
            <div className="relative inline-block">
            
            {/* Small Label */}
            <p className="text-red-500 uppercase tracking-[6px] text-sm mb-3 text-center">
                FastZone Story
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-4xl font-black uppercase tracking-tight relative z-10">
                About Us
            </h1>

            {/* Underline */}
            <div className="mt-1 flex justify-center">
                <div className="relative w-40 h-[4px] bg-red-500 rounded-full">
                
                <div className="absolute left-0 top-0 w-20 h-[4px] bg-red-300 blur-sm rounded-full"></div>

                <div className="absolute right-0 -top-[6px] w-4 h-4 bg-red-500 rounded-full border-4 border-[#1d1d1f]"></div>
                </div>
            </div>

            {/* Background Text */}
            <h1 className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl md:text-9xl font-black uppercase text-white/[0.03] pointer-events-none select-none">
                Fashion
            </h1>
            </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-6">
            
            {/* ================= IMAGE SIDE ================= */}
            <div className="relative group">
            
            {/* Glow */}
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-[40px]"></div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[40px] border border-white/10">
                
                <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
                alt="Fashion"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
                
                <h2 className="text-3xl font-black text-red-500">
                5+
                </h2>

                <p className="text-gray-300 uppercase tracking-[3px] text-sm">
                Years Experience
                </p>
            </div>
            </div>

            {/* ================= TEXT SIDE ================= */}
            <div>
            
            <p className="text-red-500 uppercase tracking-[6px] text-sm mb-4">
                Premium Streetwear
            </p>

            <h2 className="text-4xl md:text-4xl font-black uppercase leading-tight mb-8">
                Redefining Modern Fashion
            </h2>

            <p className="text-gray-400 leading-relaxed text-lg mb-8">
                FastZone was built for the new generation of fashion lovers
                who want more than just clothing. We combine luxury streetwear,
                bold aesthetics, and premium craftsmanship to create outfits
                that make a statement.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg mb-8">
                From oversized hoodies and urban essentials to modern luxury
                fits, our collections are designed to elevate confidence and
                express individuality with every piece.
            </p>

            {/* Mission Card */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-8 hover:border-red-500/40 transition duration-500">
                
                <h3 className="text-2xl font-bold mb-4">
                Our Mission
                </h3>

                <p className="text-gray-400 leading-relaxed">
                To empower people through fashion by delivering premium,
                trend-driven clothing that blends comfort, confidence,
                and modern street culture.
                </p>
            </div>
            </div>
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <div className="mt-15">
            
            {/* Heading */}
            <div className="mb-14">
            
            <p className="text-red-500 uppercase tracking-[6px] text-sm mb-3">
                Why FastZone
            </p>

            <h1 className="text-4xl md:text-4xl font-black uppercase">
                Why Choose Us
            </h1>

            <div className="w-32 h-[4px] bg-red-500 rounded-full mt-1"></div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[-12px]">

            {/* Card */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-10 hover:border-red-500/40 transition duration-500 hover:-translate-y-2">
                
                <h2 className="text-2xl font-bold mb-5">
                Premium Quality
                </h2>

                <p className="text-gray-400 leading-relaxed">
                Every product is crafted with premium materials and
                designed for long-lasting comfort and style.
                </p>
            </div>

            {/* Card */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-10 hover:border-red-500/40 transition duration-500 hover:-translate-y-2">
                
                <h2 className="text-2xl font-bold mb-5">
                Trend Driven
                </h2>

                <p className="text-gray-400 leading-relaxed">
                Stay ahead with modern streetwear collections inspired
                by global fashion and urban culture.
                </p>
            </div>

            {/* Card */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl p-10 hover:border-red-500/40 transition duration-500 hover:-translate-y-2">
                
                <h2 className="text-2xl font-bold mb-5">
                Fast Delivery
                </h2>

                <p className="text-gray-400 leading-relaxed">
                Experience smooth shopping and quick delivery with
                customer-first service and secure packaging.
                </p>
            </div>
            </div>
        </div>
      </div>
      <div className="mt-12">
        <Subscribe/>
      </div>
      <div className="mt-[-372px]">
        <Footer/>
      </div>
    </section>
  );
}