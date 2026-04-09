import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: false},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: false},
  {id: 'UPI', displayText: 'UPI', isDisabled: false},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: false},
  {id: 'CASH ON DELIVERY', displayText: 'Cash on Delivery', isDisabled: false},
]

const Payment = ({close}) => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    setPaymentMethod(event.target.id)
  }

  const onPlaceOrder = () => {
    // Show success text inside this component first
    setIsOrderPlaced(true)
  }

  const handleCloseAndClearCart = () => {
    // Clear the cart only when exiting the success view
    removeAllCartItems()
    close()
  }

  const getTotalPrice = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const getTotalItems = () =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="payments-container">
      {isOrderPlaced ? (
        <div className="success-view">
          <p className="success-message">
            Your order has been placed successfully
          </p>
          <button
            type="button"
            className="confirm-order-button"
            onClick={handleCloseAndClearCart}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h1 className="payments-heading">Payment Details</h1>
          <p className="payments-sub-heading">Payment Method</p>
          <ul className="payment-method-inputs">
            {paymentOptionsList.map(eachMethod => (
              <li key={eachMethod.id} className="payment-method-input-container">
                <input
                  className="payment-method-input"
                  id={eachMethod.id}
                  type="radio"
                  name="paymentMethod"
                  onChange={updatePaymentMethod}
                  checked={paymentMethod === eachMethod.id}
                />
                <label
                  className={`payment-method-label ${
                    paymentMethod === eachMethod.id ? 'active-label' : ''
                  }`}
                  htmlFor={eachMethod.id}
                >
                  {eachMethod.displayText}
                </label>
              </li>
            ))}
          </ul>
          <div className="order-details">
            <h1 className="payments-sub-heading">Order details:</h1>
            <p className="order-text">Items: <span className="highlight">{getTotalItems()}</span></p>
            <p className="order-text">Total Price: <span className="highlight">RS {getTotalPrice()}/-</span></p>
          </div>
          <button
            disabled={paymentMethod === ''}
            type="button"
            className="confirm-order-button"
            onClick={onPlaceOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment