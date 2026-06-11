import React, { useContext, useEffect, useState } from 'react'
import {
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import {
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import userContext from '../context/UserContext';

function NavBar({setSearchValue}) {
  const {isLoggedIn,setIsLoggedIn,setCurrentUser} = useContext(userContext)
  const [activate,setActivate] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const dropDownMenu = ()=>{
    if(!isLoggedIn){
      navigate('/login')
    }
    else{
      setActivate((prev)=>!prev)
    }
  }

  const [searchInput, setSearchInput] = useState("")
  useEffect(() => {
    if (setSearchValue) {
      setSearchValue(searchInput)
    }
  }, [searchInput, setSearchValue])

  const [triggerSearch, setTriggerSearch] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // ================= SEARCH BUTTON =================
  const searchButtonWork = () => {
    navigate('/Collection', {
      state: { openSearch: true }
    })
  }
  const LogOut = ()=>{

  setIsLoggedIn(false)
  setCurrentUser(null)
  localStorage.removeItem("currentUser")
  localStorage.removeItem("isLoggedIn")
  navigate('/login')
  }

  // ================= OPEN SEARCH ONLY FROM SEARCH ICON =================
  useEffect(() => {

    if (
      location.pathname === "/Collection" &&
      location.state?.openSearch
    ) {
      setTriggerSearch(true)
    }

  }, [location])

  return (
    <nav className="flex flex-col">

      <div className="flex items-center justify-between px-10 py-6 relative z-20">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>

          <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
            FASTZONE
          </h1>

        </div>

        {/* ================= MENU ================= */}
        <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest text-gray-300">

          <li className="hover:text-white cursor-pointer transition">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

          </li>

          <li className="hover:text-white cursor-pointer transition">

            <NavLink
              to="/Collection"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Collection
            </NavLink>

          </li>

          <li className="hover:text-white cursor-pointer transition">

            <NavLink
              to="/About"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              About
            </NavLink>

          </li>

          <li className="hover:text-white cursor-pointer transition">

            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>

          </li>

        </ul>

        {/* ================= ICONS ================= */}
        <div className="flex items-center gap-5">

          <Search
            onClick={searchButtonWork}
            className="w-5 h-5 cursor-pointer"
          />

          <ShoppingBag onClick={()=>navigate('/Cart')} className="w-5 h-5 cursor-pointer" />

          <div className="">
            <User onClick={()=>dropDownMenu()} className={`w-5 h-5 cursor-pointer`} />

            <div className={`right-0 top-12 w-36 bg-[#252527] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 mt-3 mr-10 ${activate?"absolute":"hidden"}`}>
              <button
                onClick={() => navigate("/order")}
                className="w-full text-left px-5 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition duration-300 cursor-pointer flex justify-center"
              >
                Order
              </button>
              <div className="h-px bg-white/10"></div>
              <button
                onClick={()=>LogOut()}
                className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer flex justify-center"
              >
                Logout
              </button>
            </div>

          </div>

          <div className="md:hidden flex text-2xl mt-[-6px] z-50">
            <button
              onClick={() => setMobileMenu((prev) => !prev)}
              className="cursor-pointer text-white"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-[55%] bg-[#252527] border-l border-white/10 shadow-2xl z-40 transition-all duration-300 ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-10">

          <button
            onClick={() => {
              navigate("/")
              setMobileMenu(false)
            }}
            className="cursor-pointer py-5 text-center text-lg text-gray-300 hover:bg-white/5 hover:text-red-500 transition"
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate("/Collection")
              setMobileMenu(false)
            }}
            className="cursor-pointer py-5 text-center text-lg text-gray-300 hover:bg-white/5 hover:text-red-500 transition"
          >
            Collection
          </button>

          <button
            onClick={() => {
              navigate("/About")
              setMobileMenu(false)
            }}
            className="cursor-pointer py-5 text-center text-lg text-gray-300 hover:bg-white/5 hover:text-red-500 transition"
          >
            About
          </button>

          <button
            onClick={() => {
              navigate("/Contact")
              setMobileMenu(false)
            }}
            className="cursor-pointer py-5 text-center text-lg text-gray-300 hover:bg-white/5 hover:text-red-500 transition"
          >
            Contact
          </button>

        </div>
      </div>

      {mobileMenu && (
      <div
        onClick={() => setMobileMenu(false)}
        className="fixed inset-0 bg-black/50 z-30 md:hidden"
      />
    )}

      {/* ================= SEARCH BAR ================= */}
      <div className="flex justify-center">

        <div
          className={
            triggerSearch
              ? "flex justify-center px-4 items-center gap-4"
              : "hidden"
          }
        >

          <div className="relative sm:xl md:w-2xl">

            {/* Input */}
            <input
              className="w-full border border-gray-700 bg-[#252527] text-gray-200 p-3 pr-14 pl-5 rounded-2xl focus:outline-none focus:border-red-500 transition"
              placeholder="Search"
              type="text"
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput}
            />

            {/* Search Button */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 transition duration-300 p-2 rounded-xl cursor-pointer"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

          </div>

          {/* Close Button */}
          <div
            onClick={() => setTriggerSearch(false)}
            className="text-2xl cursor-pointer"
          >
            &times;
          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavBar