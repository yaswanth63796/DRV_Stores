import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createOrder } from '../services/orderService';
import api from '../services/api';
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
  const [showPaymentChoice, setShowPaymentChoice] = useState(false);

  const handlePlaceOrder = async (method = 'ONLINE') => {
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
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    try {
      setLoading(true);
      const response = await createOrder(orderData);
      const order = response.data;
      
      if (method === 'CASH') {
        clearCart();
        navigate('/customer/payment-success'); // Reuse success page but text says placed
        return;
      }

      const options = {
        key: 'rzp_test_SeeQ3iyTAuirFn', 
        amount: order.totalAmount * 100,
        currency: 'INR',
        name: 'DRV STORES',
        description: 'Payment for Order #' + order.id,
        order_id: order.razorpayOrderId,
        handler: async (response) => {
          try {
            await api.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              local_order_id: order.id
            });
            clearCart();
            navigate('/customer/payment-success');
          } catch (err) {
            console.error("Verification Error:", err);
            alert('Payment verification failed. Check developer console for details.');
          }
        },
        prefill: {
          name: user.name || user.username,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#2d6a4f'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
      setShowPaymentChoice(false);
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
            <button className="btn btn-primary" onClick={() => setShowPaymentChoice(true)} disabled={loading}>
              Place Order
            </button>
          </div>
        </>
      )}

      {showPaymentChoice && (
        <div className="payment-modal-overlay">
          <div className="payment-modal card">
            <h2>செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும் (Choose Payment Method)</h2>
            <p>எப்படி பணம் செலுத்த விரும்புகிறீர்கள்?</p>
            
            <div className="payment-options">
              <button 
                className="payment-opt-btn cash" 
                onClick={() => handlePlaceOrder('CASH')}
              >
                <div className="opt-icon">💵</div>
                <div className="opt-text">
                  <strong>நேரடி பணம் (Cash)</strong>
                  <span>பயன்படுத்தி பணம் செலுத்துங்கள்</span>
                </div>
              </button>

              <button 
                className="payment-opt-btn online" 
                onClick={() => handlePlaceOrder('ONLINE')}
              >
                <div className="opt-icon">💳</div>
                <div className="opt-text">
                  <strong>ஆன்லைன் பேமெண்ட் (Online)</strong>
                  <span>Razorpay மூலம் பணம் செலுத்துங்கள்</span>
                </div>
              </button>
            </div>

            <button className="btn btn-secondary" onClick={() => setShowPaymentChoice(false)}>
              ரத்து செய் (Cancel)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;