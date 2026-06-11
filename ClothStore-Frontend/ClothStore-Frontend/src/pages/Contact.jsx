import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Subscribe from "./Subscribe";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <section className="min-h-screen bg-[#1d1d1f] text-white overflow-hidden">
      <NavBar/>
      {/* ================= HEADING ================= */}
      <div className="bg-[#1d1d1f] text-white py-10 px-6 md:px-16 overflow-hidden">

      <div className="flex mb-20">

        <div className="relative inline-block">

          {/* Small Label */}
          <p className="text-red-500 uppercase tracking-[6px] text-sm mb-3 text-center">
            FastZone Support
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-4xl font-black uppercase tracking-tight relative z-10">
            Contact Us
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
            FastZone
          </h1>

        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-[-20px] px-12">

        {/* ================= IMAGE SIDE ================= */}
        <div className="relative group">

          {/* Glow */}
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-[40px]"></div>

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[40px] border border-white/10">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Contact"
              className="w-full h-[550px] object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

          </div>

          {/* Floating Card */}
          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">

            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-1">
              Customer Support
            </p>

            <h2 className="text-2xl font-bold">
              24/7 Available
            </h2>

          </div>
        </div>

        {/* ================= INFO SIDE ================= */}
        <div>

          <p className="text-red-500 uppercase tracking-[6px] text-sm mb-0 mt-[-50px]">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-4xl font-black uppercase leading-tight mb-8">
            We’d Love To Hear From You
          </h2>

          <p className="text-gray-400 text-md leading-relaxed mb-7">
            Have questions about our collections, orders, or collaborations?
            Our FastZone support team is always ready to help you with
            premium customer service and fast responses.
          </p>

          {/* ================= CONTACT CARDS ================= */}
          <div className="space-y-4">

            {/* Address */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl py-2 px-4 hover:border-red-500/40 transition duration-500 flex items-start gap-5">

              <div className="w-14 h-14 rounded-xl bg-black/40 flex items-center justify-center text-red-500">
                <MapPin className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Our Store
                </h3>

                <p className="text-gray-400 leading-relaxed text-[12px]">
                  54709 Fashion Street <br />
                  Mumbai, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl py-2 px-4 hover:border-red-500/40 transition duration-500 flex items-start gap-5">

              <div className="w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center text-red-500">
                <Phone className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Contact
                </h3>

                <p className="text-gray-400 leading-relaxed text-[12px]">
                  +91 98765 43210 <br />
                  support@fastzone.com
                </p>
              </div>
            </div>

            {/* Careers */}
            <div className="bg-[#252527] border border-white/10 rounded-3xl py-2 px-4 hover:border-red-500/40 transition duration-500">

              <h3 className="text-2xl font-bold mb-2">
                Careers At FastZone
              </h3>

              <p className="text-gray-400 leading-relaxed mb-4">
                Join our growing fashion brand and work with a team
                passionate about creativity, luxury streetwear,
                and modern ecommerce experiences.
              </p>

              {/* Button */}
              <button className="bg-red-500 hover:bg-red-600 transition duration-300 px-6 py-3 cursor-pointer rounded-2xl font-semibold flex items-center gap-3 mb-2">

                Explore Jobs
                <ArrowRight className="w-5 h-5" />

              </button>
            </div>

          </div>
        </div>
        </div>
      </div>
      <div className="mt-20">
        <Subscribe/>
      </div>
      <div className="mt-[-390px]">
        <Footer/>
      </div>
    </section>
  );
}