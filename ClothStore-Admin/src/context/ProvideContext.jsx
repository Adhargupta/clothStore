import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from "./userContext"

export const backendURL = https://clothstore-backend-0y9u.onrender.com

function ProvideContext({children}) {
    const navigate = useNavigate()
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
      )
    const [isAdmin, setIsAdmin] = useState(
        localStorage.getItem("isAdmin") === "true"
    )
    useEffect(() => {
        if (isAdmin) {
          navigate('/add')
        }
      }, [isAdmin])
    return (
    <userContext.Provider value={{isAdmin, setIsAdmin, token , setToken}}>
        {children}
    </userContext.Provider>
  )
}

export default ProvideContext
