import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPriceINR } from '../utils/formatPrice';
import ImageWithFallback from '../components/ImageWithFallback';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>
          <p>Your cart is empty. <a href="/products">Continue shopping</a></p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="order-item">
                <ImageWithFallback src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-price">
                  {formatPriceINR(item.price * item.quantity)}
                </div>
              </div>
            ))}
            <div className="total">
              <strong>Total: {formatPriceINR(getTotalPrice())}</strong>
            </div>
          </div>
          
          <div className="checkout-form">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;