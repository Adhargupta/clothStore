import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import userContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function CollectionPage() {
    const {value,setProductDetail} = useContext(userContext)
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortBy, setSortBy] = useState('Sort By: Relevant')
    
    const productProfile = (products)=>{
        navigate(`/product/${products._id}`)
        setProductDetail(products)
    }


  return (
    <section className="bg-[#1d1d1f] text-white">
        <NavBar setSearchValue={setSearchValue} />
        <div className="py-7 px-4 sm:px-6 md:pr-24 md:pl-14 flex flex-col xl:flex-row gap-10 mt-[-12px]">
        {/* ================= LEFT FILTER SECTION ================= */}
        <div className="hidden xl:block">

          {/* Filter Heading */}
          <div className="text-[28px] mb-7 mt-14 font-bold tracking-wide">
            <h2>
              FILT<span className='text-red-500'>ERS</span>
            </h2>
          </div>

          {/* Filter Boxes */}
          <div className="flex flex-col gap-7">

            {/* Categories */}
            <div className="border border-white/10 bg-[#252527] rounded-3xl w-[280px] py-6 px-6">

              <div className="text-lg font-semibold mb-4">
                CATEGORIES
              </div>

              <div className="text-gray-300 flex flex-col gap-4">

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>{e.target.checked?setCategory((prev)=>[...prev,"Men"]):setCategory((prev)=>prev.filter((item)=>item!=="Men"))}}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='men'
                  />
                  <label for='men'>Men</label>
                </label>

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>{e.target.checked?setCategory((prev)=>[...prev,"Women"]):setCategory((prev)=>prev.filter((item)=>item!=="Women"))}}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='women'
                  />
                  <label for='women'>Women</label>
                </label>

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>{e.target.checked?setCategory((prev)=>[...prev,"Kids"]):setCategory((prev)=>prev.filter((item)=>item!=="Kids"))}}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='kids'
                  />
                  <label for='kids'>Kids</label>
                </label>

              </div>
            </div>

            {/* Type */}
            <div className="border border-white/10 bg-[#252527] rounded-3xl w-[280px] py-6 px-6">

              <div className="text-lg font-semibold mb-4">
                TYPE
              </div>

              <div className="text-gray-300 flex flex-col gap-4">

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>setSubCategory(e.target.checked?(prev)=>[...prev,'Topwear']:(prev)=>prev.filter((item)=>item!=="Topwear"))}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='topwear'
                  />
                  <label for='topwear'>Topwear</label>
                </label>

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>setSubCategory(e.target.checked?(prev)=>[...prev,"Bottomwear"]:(prev)=>prev.filter((item)=>item!=="Bottomwear"))}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='bottomwear'
                  />
                  <span for='bottomwear'>Bottomwear</span>
                </label>

                <label className="flex gap-3 items-center cursor-pointer">
                  <input
                    onClick={(e)=>setSubCategory((prev)=>e.target.checked?[...prev,'Winterwear']:prev.filter((item)=>item!=='Winterwear'))}
                    type="checkbox"
                    className="w-4 h-4 accent-red-500 cursor-pointer"
                    id='winterwear'
                  />
                  <span for='winterwear'>Winterwear</span>
                </label>

              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="w-full">

          {/* ================= TOP BAR ================= */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

            {/* Heading */}
            <div>

              <p className="text-red-500 uppercase tracking-[6px] text-sm mb-3">
                FastZone Fashion
              </p>

              <div className="flex items-center gap-4 flex-wrap">

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black uppercase text-white">
                  All Collections
                </h1>

                <div className="w-16 sm:w-20 h-[4px] bg-red-500 rounded-full"></div>

              </div>
            </div>

            {/* Sort Dropdown */}
            <select onClick={(e)=>setSortBy(e.target.value)} className="bg-[#252527] border border-white/10 text-gray-300 px-3 py-2 rounded-2xl focus:outline-none focus:border-red-500 transition cursor-pointer w-full md:w-auto">

              <option>Sort By: Relevant</option>
              <option>Newest</option>
              <option>Low To High</option>
              <option>High To Low</option>

            </select>
          </div>

          {/* ================= PRODUCT GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-[-12px] justify-items-center lg:justify-items-stretch">            
          {[...value.products]
            // SORT
            .sort((a, b) => {

              if (sortBy === "Low To High") {
                return a.price - b.price
              }

              if (sortBy === "High To Low") {
                return b.price - a.price
              }

              if (sortBy === "Newest") {
                return b.date - a.date
              }

              return a._id.localeCompare(b._id)
            })

            // SEARCH
            .filter((product) =>
              product.name
                .toLowerCase()
                .includes(searchValue.trim().toLowerCase())
            )

            // CATEGORY + SUBCATEGORY
            .filter((product) => {

              const categoryMatch =
                category.length === 0 ||
                category.includes(product.category)

              const subCategoryMatch =
                subCategory.length === 0 ||
                subCategory.includes(product.subCategory)

              return categoryMatch && subCategoryMatch
            })

            // MAP
            .map((products) => (
            <div
                key={products._id}
                onClick={()=>productProfile(products)}
                className="group bg-[#252527] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 transition duration-500 cursor-pointer max-w-[270px]"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={products.image[0]}
                    alt={products.title}
                    loading="lazy"
                    className="w-full h-[150px] sm:h-[200px] lg:h-[220px] object-cover group-hover:scale-110 transition-transform duration-700 object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="p-2">

                  <h2 className="text-md font-semibold text-white leading-relaxed mb-0 group-hover:text-red-500 transition duration-300">
                    {products.name}
                  </h2>

                  <p className="text-1xl font-black text-red-500">
                    {products.price}
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="">
        <Footer/>
      </div>
    </section>
  )
}

export default CollectionPage