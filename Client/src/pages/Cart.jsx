import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPriceINR } from '../utils/formatPrice';
import ImageWithFallback from '../components/ImageWithFallback';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart ({getTotalItems()} items)</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <ImageWithFallback src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Price: {formatPriceINR(item.price)}</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                  >
                    +
                    
                  </button>
                </div>
                <div className="item-total">
                  {formatPriceINR(item.price * item.quantity)}
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(`${item.id}-${item.size}`)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPriceINR(getTotalPrice())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatPriceINR(getTotalPrice())}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;