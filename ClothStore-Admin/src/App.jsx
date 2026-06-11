import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import userContext from './context/userContext'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './component/ProtectedRoute'

function App() {

  const { token } = useContext(userContext)

  return (
    <>
      <ToastContainer />

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/add" />
              : <Login />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/add"
          element={
            <ProtectedRoute token={token}>
              <Add />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list"
          element={
            <ProtectedRoute token={token}>
              <List />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute token={token}>
              <Orders />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App