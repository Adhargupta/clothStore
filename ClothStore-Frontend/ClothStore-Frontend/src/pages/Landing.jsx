import React from "react";
import NavBar from "../components/NavBar";
import Hero from "./Hero";
import Collection from "./Collection";
import BestCollection from "./BestCollection";
import Policy from "./Policy";
import Subscribe from "./Subscribe";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#1d1d1f] text-white overflow-hidden">
      {/* ================= NAVBAR ================= */}

      <NavBar/>
      
      {/* ================= HERO SECTION ================= */}
      
      <Hero/>

      {/* ================= COLLECTION SECTION ================= */}

      <Collection/>

      {/* ================= BEST COLLECTION SECTION ================= */}

      <BestCollection/>

      {/* ================= POLICY SECTION ================= */}

      <Policy/>

      {/* ================= SUBSCRIBE SECTION ================= */}

      <Subscribe/>

      {/* ================= FOOTER SECTION ================= */}
      <div className="mt-[-350px]">
        <Footer/>
      </div>
    </div>
  );
}