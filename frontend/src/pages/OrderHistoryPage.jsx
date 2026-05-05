import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUserStr = localStorage.getItem('user');
      const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
      
      if (storedUser && !storedUser.id) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }
      try {
        setLoading(true);
        const response = await getMyOrders();
        setOrders(response.data);
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
    <div className="order-history">
      <h1>My Orders</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ul className="table-item-list">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} <span className="item-qty">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                      {order.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="price-col">₹{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;