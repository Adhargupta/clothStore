import React from 'react'
import {
    PackagePlus,
    ClipboardList,
    ShoppingBag,
  } from "lucide-react";
import {useNavigate,NavLink} from 'react-router-dom'

function LeftMenu() {
    const navigate = useNavigate()
  return (
    <div>
        <div className="lg:flex lg:w-[240px] border-r border-white/10 flex-col px-5 py-8">

        {/* Logo */}
        <div className="mb-12">

        <h1 className=" text-[12px] md:text-3xl font-black tracking-wide">
            FASTZONE
        </h1>
        <p className="text-[8px] text-red-500 md:text-sm tracking-[4px] uppercase mt-1">
            Admin Panel
        </p>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4">

        <NavLink
            to='/add'
            className={({isActive})=>
            `transition ${
                isActive
                ?"bg-red-500/10 border border-red-500 text-red-500"
                :"hover:bg-white/5 border border-white/10 "
            }`
            }
        >
            <button
            onClick={()=>navigate('/add')}
            className={`
            flex items-center gap-4 rounded-2xl px-5 py-4 font-semibold cursor-pointer justify-center`}
            >
                <PackagePlus className="w-5 h-5" />
                <span className='hidden md:inline md:text-[16px]'>
                    Add Items
                </span>
            </button>
        </NavLink>

        <NavLink
            to='/list'
            className={({isActive})=>
            `transition ${
                isActive
                ?"bg-red-500/10 border border-red-500 text-red-500"
                :"hover:bg-white/5 border border-white/10 "
            }`
            }
        >
            <button onClick={()=>navigate('/list')} className="flex items-center gap-4 rounded-2xl px-5 py-4 transition cursor-pointer justify-center">
                <ClipboardList className="w-5 h-5" />
                <span className='hidden md:inline md:text-[16px]'>
                    List Items
                </span>
            </button>
        </NavLink>

        <NavLink
            to='/orders'
            className={({isActive})=>
            `transition ${
                isActive
                ?"bg-red-500/10 border border-red-500 text-red-500"
                :"hover:bg-white/5 border border-white/10 "
            }`
            }
        >
            <button onClick={()=>navigate('/orders')} className="flex items-center gap-4 rounded-2xl px-2 px-5 py-4 transition cursor-pointer justify-center">
                <ShoppingBag className="w-5 h-5" />
                <span className='hidden md:inline md:text-[16px]'>
                    Orders
                </span>
            </button>
        </NavLink>
        </div>

        </div>
    </div>
  )
}

export default LeftMenu