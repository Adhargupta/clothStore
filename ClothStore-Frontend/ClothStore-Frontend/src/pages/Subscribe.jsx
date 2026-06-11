import React from 'react'

function Subscribe() {
  return (
    <div>
        <section className="min-h-screen bg-[#1d1d1f] px-8 md:px-16 py-20 text-white mt-[-45px]">
            <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-5 justify-center'>
                    <span>
                        <span className="text-3xl md:text-3xl font-black uppercase leading-tight">
                            Subscribe
                        </span>
                        <div className="relative">
                            {/* Main Line */}
                            <div className="w-43 h-[4px] bg-red-500 rounded-full"></div>

                            {/* Glow Effect */}
                            {/* <div className="absolute top-0 left-0 w-24 h-[4px] bg-red-300 blur-sm rounded-full"></div> */}

                            {/* Decorative Circle */}
                            {/* <div className="absolute -right-2 -top-[6px] w-4 h-4 rounded-full bg-red-500 border-4 border-[#1d1d1f]"></div> */}
                        </div>
                    </span>
                    <span className="text-2xl md:text-2xl font uppercase mt-[5px]">
                        now $ get 
                        <span className='pl-2 pr-2 font-black'>
                            20%
                        </span>
                        off
                    </span>
                </div>
                <p className='text-center max-w-140 mt-7 subs-text text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, error ipsum at saepe eveniet ipsa! Odio voluptas eveniet at illo?
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xl">
    
                    <input
                        className="w-full sm:flex-1 border border-gray-700 bg-[#252527] text-gray-200 p-3 px-5 rounded-2xl focus:outline-none focus:border-red-500 transition"
                        placeholder="Enter your email"
                        type="text"
                    />
                    <button className="bg-black hover:bg-red-500 transition duration-300 p-3 px-7 rounded-2xl cursor-pointer whitespace-nowrap">
                        Subscribe
                    </button>

                </div>
            </div>
        </section>
    </div>
  )
}

export default Subscribe