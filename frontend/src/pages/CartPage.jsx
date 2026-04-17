import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createOrder } from '../services/orderService';
import CartItem from '../components/CartItem';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    const orderData = {
      id: Date.now().toString(),
      userId: user.id,
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      setLoading(true);
      const response = await createOrder(orderData);
      clearCart();
      alert('Order placed successfully! Order ID: ' + response.data.id);
      navigate('/customer/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/customer/products')}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p>Total Amount: ₹{getCartTotal()}</p>
            <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={loading}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;