import {useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = product => {
    setCartList(prevList => {
      const isProductAlreadyExists = prevList.find(
        item => item.id === product.id,
      )

      if (isProductAlreadyExists) {
        return prevList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        )
      }
      return [...prevList, product]
    })
  }

  const removeCartItem = productId => {
    setCartList(prevList => prevList.filter(item => item.id !== productId))
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = productId => {
    setCartList(prevList =>
      prevList.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = productId => {
    setCartList(prevList =>
      prevList
        .map(item =>
          item.id === productId ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity >= 1),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes Group */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductItemDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Fallback & Not Found */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App