import React from "react";
import {
  RefreshCcw,
  BadgeCheck,
  Headphones,
} from "lucide-react";

export default function Policy() {
  const features = [
    {
      icon: <RefreshCcw className="w-10 h-10" />,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy",
    },

    {
      icon: <BadgeCheck className="w-10 h-10" />,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy",
    },

    {
      icon: <Headphones className="w-10 h-10" />,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support",
    },
  ];

  return (
    <section className="relative z-20 mt-[-80px] md:mt-[-120px] lg:mt-[-215px] py-20 px-6 md:px-16 text-white flex justify-center">

      {/* Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-15">

        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center rounded-3xl py-10 px-6 border border-white/5 hover:border-red-500/40 transition-all duration-500 hover:-translate-y-2 w-full max-w-[320px] bg-[#1d1d1f]/80 backdrop-blur-md"
          >

            {/* Icon */}
            <div className="w-15 h-15 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition duration-500">
              {feature.icon}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-3">
              {feature.title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}