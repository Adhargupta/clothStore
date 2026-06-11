import { useState } from 'react'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import { Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage'
import Product from './pages/Product'
import CartPage from './pages/CartPage'
import PayementPage from './pages/PayementPage'
import Orders from './pages/Orders'
import UserLogin from './pages/UserLogin'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register'
import VerifyPage from './pages/VerifyPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/Collection' element={<CollectionPage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/Cart' element={<CartPage/>}/>
        <Route path='/place-order' element={<PayementPage/>}/>
        <Route path='/order' element={<Orders/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </>
  )
}

export default App
