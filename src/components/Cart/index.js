import {useContext} from 'react' // Import the hook
import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => {
  // 1. Destructure context values using the hook
  const {cartList, removeAllCartItems} = useContext(CartContext)

  // 2. Logic for rendering
  const showEmptyView = cartList.length === 0

  const onClickRemoveAllBtn = () => {
    removeAllCartItems()
  }

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAllBtn}
            >
              Remove All
            </button>
            <CartListView />
            {/* The Summary automatically updates because it shares this context */}
            <CartSummary />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart