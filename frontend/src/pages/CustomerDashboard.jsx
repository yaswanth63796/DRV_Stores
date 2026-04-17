import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyOrders } from '../services/orderService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
        setRecentOrders(response.data.slice(0, 5));
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="customer-dashboard">
      <h1>Welcome, {user?.username}</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      <div className="quick-actions">
        <button className="btn btn-primary" onClick={() => navigate('/customer/products')}>
          Browse Products
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/customer/cart')}>
          View Cart
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/customer/orders')}>
          My Orders
        </button>
      </div>

      <div className="recent-orders card">
        <h2>Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul>
            {recentOrders.map(order => (
              <li key={order.id}>
                <span>Order #{order.id}</span>
                <span>₹{order.totalAmount}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => navigate(`/customer/bill/${order.id}`)}
                >
                  View Bill
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;