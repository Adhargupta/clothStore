import React, { useEffect, useState, useCallback } from 'react'
import userContext from './UserContext'
import axios from "axios";

function ProvideContext({children}) {
  const backendURL = import.meta.env.VITE_BACKEND_URL

  // const [orderItem, setOrderItem] = useState(() => {
  //   const items = localStorage.getItem("orderItem")
  //   return items ? JSON.parse(items) : []
  // })
  const [orders, setOrders] = useState([])
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser")
      return user ? JSON.parse(user) : null
    } catch {
      localStorage.removeItem("currentUser")
      return null
    }
  })
 
  const [products, setProducts] = useState([])

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true"
  })

  const [cartProduct, setCartProduct] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartProduct")
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      localStorage.removeItem("cartProduct")
      return []
    }
  })

  const [productDetail, setProductDetail] = useState(() => {
    try {
      const savedProduct = localStorage.getItem("productDetail")
      return savedProduct ? JSON.parse(savedProduct) : null
    } catch {
      localStorage.removeItem("productDetail")
      return null
    }
  })

  const [sizeItem, setSizeItem] = useState([])
  const [subtotal, setSubtotal] = useState(()=>{
    return Number(localStorage.getItem("subtotal"))||0
  })
  const currency = '$'
  const delivery_fee = 20

  // ✅ Wrap in useCallback so it's stable and reusable
  const gettingProduct = useCallback(async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list")
      // ✅ Guard against unexpected response shape
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }, [backendURL])

  // ✅ Fetch products on mount AND whenever login state changes
  useEffect(() => {
    gettingProduct()
  }, [gettingProduct])

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    localStorage.setItem("cartProduct", JSON.stringify(cartProduct))
  }, [cartProduct])

  useEffect(() => {
    if (productDetail) {
      localStorage.setItem("productDetail", JSON.stringify(productDetail))
    }
  }, [productDetail])

  // useEffect(() => {
  //   localStorage.setItem(
  //     "orderItem",
  //     JSON.stringify(orderItem)
  //   )
  // }, [orderItem])

  const value = {
    products,
    currency,
    delivery_fee
  }

  return (
    <userContext.Provider value={{
      value,
      products,
      productDetail,
      setProductDetail,
      sizeItem,
      setSizeItem,
      cartProduct,
      setCartProduct,
      backendURL,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
      gettingProduct,
      subtotal, 
      setSubtotal,
      // orderItem, 
      // setOrderItem,
      orders, 
      setOrders
    }}>
      {children}
    </userContext.Provider>
  )
}

export default ProvideContext
