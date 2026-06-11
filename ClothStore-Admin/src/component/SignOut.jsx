import React, { useContext } from 'react'
import userContext from '../context/userContext'
import { useNavigate } from 'react-router-dom'

function SignOut() {
    const {setToken} = useContext(userContext)
    const navigate = useNavigate()
    const logoutFunction = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
     }
  return (
    <div>
        <button
        onClick={()=>logoutFunction()}
        className="mt-[-42px] bg-red-500 hover:bg-red-600 transition duration-300 px-6 py-2 rounded-2xl font-semibold cursor-pointer">
            Logout
          </button>
    </div>
  )
}

export default SignOut