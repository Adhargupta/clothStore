import React from 'react'


const products = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      price: "$145",
      image:
        "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
    },
  
    {
      id: 2,
      title: "Oversized Street Hoodie",
      price: "$95",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    },
  
    {
      id: 3,
      title: "Urban Cargo Style",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
  
    {
      id: 4,
      title: "Minimal Black Outfit",
      price: "$85",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

function BestCollection() {
  return (
    <div>
        <section className="min-h-screen mt-[-50px] bg-[#1d1d1f] px-8 md:px-16 py-20 text-white">
        {/* ================= HEADING ================= */}
            <div className="mb-16">
                <div className="relative inline-block mb-12">

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white relative z-10 mt-[-30px]">
                        Best Collections
                    </h1>

                    {/* Stylish Underline */}
                    <div className="relative mt-2">
                        
                        {/* Main Line */}
                        <div className="w-40 h-[4px] bg-red-500 rounded-full"></div>

                        {/* Glow Effect */}
                        <div className="absolute top-0 left-0 w-24 h-[4px] bg-red-300 blur-sm rounded-full"></div>

                        {/* Decorative Circle */}
                        <div className="absolute -right-2 -top-[6px] w-4 h-4 rounded-full bg-red-500 border-4 border-[#1d1d1f]"></div>
                    </div>

                    {/* Huge Background Text */}
                    <h1 className="absolute -top-6 left-0 text-6xl md:text-8xl font-black uppercase text-white/[0.03] tracking-widest pointer-events-none select-none">
                        Fashion
                    </h1>
                </div>
            </div>


            {/* ================= PRODUCT GRID ================= */}
            <div className="mt-[-50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 px-[50px]">
                {products.map((product) => (
                <div
                    key={product.id}
                    className="group bg-[#252527] rounded-3xl overflow-hidden border border-white/5 hover:border-red-500/40 transition-all duration-500 cursor-pointer"
                >
                    {/* IMAGE */}
                    <div className="overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-700 object-top"
                    />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 bg-transparent">
                    <h2 className="text-1xl font-bold mb-2">
                        {product.title}
                    </h2>

                    <p className="text-red-500 text-1xl font-semibold">
                        {product.price}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    </div>
  )
}

export default BestCollection