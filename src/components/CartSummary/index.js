import {useContext} from 'react'
import Popup from 'reactjs-popup'

import Payment from '../Payment'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  // 1. Access context directly
  const {cartList} = useContext(CartContext)

  // 2. Logic for total items and price
  const items = cartList.length
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )

  return (
    <div className="cart-summary-container">
      <div className="cart-summary-card">
        <h1 className="cart-items-total-price">
          Order Total: <span>RS {totalPrice}/-</span>
        </h1>
        <p className="cart-items-count">{items} Items in cart</p>

        {/* 3. reactjs-popup integration */}
        <Popup
          modal
          trigger={
            <button className="checkout-btn" type="button">
              Checkout
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              {/* Pass the close function to Payment so you can close it on success */}
              <Payment close={close} />
              <button 
                type="button" 
                className="close-button" 
                onClick={() => close()}
              >
                Close
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default CartSummary