import React from "react";

const products = [
  {
    id: 1,
    title: "Oversized Hoodie",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Streetwear Jacket",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Classic Black Tee",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Modern Denim",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Luxury Coat",
    price: "$180",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Minimal Shirt",
    price: "$55",
    image:
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Urban Fashion",
    price: "$130",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Premium Blazer",
    price: "$160",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Winter Collection",
    price: "$140",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Elegant Wear",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Baggy Street Fit",
    price: "$90",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Modern Casual",
    price: "$70",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Collection() {
  return (
    <section className="min-h-screen bg-[#1d1d1f] px-8 md:px-16 py-20 text-white">
      {/* ================= HEADING ================= */}
      <div className="mb-16">
        <p className="text-red-500 uppercase tracking-[6px] text-sm mb-4">
          FastZone Collection
        </p>

        <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight">
          Collections
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

        <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
          Explore our premium fashion collection designed for modern
          streetwear lovers. Elevate your style with luxury outfits,
          oversized fits, and trending essentials.
        </p>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="mt-[-20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 px-[50px]">
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
  );
}