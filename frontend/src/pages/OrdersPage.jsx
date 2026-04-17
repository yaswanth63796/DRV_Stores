import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/orderService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      setError('failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setSuccess(`Order #${orderId} status updated to ${newStatus}`);
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
  };

  if (loading) return <Spinner />;

  return (
    <div className="orders-page">
      <h1>ஆர்டர்கள் மேலாண்மை (Orders Management)</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="orders-container card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>வாடிக்கையாளர் (Customer)</th>
              <th>தேதி (Date)</th>
              <th>மொத்தம் (Total)</th>
              <th>நிலை (Status)</th>
              <th>செயல்கள் (Actions)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <select 
                    className={`status-select status-badge ${order.status.toLowerCase()}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => viewDetails(order)}
                  >
                    விவரங்கள் (Details)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="details-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            <h2>ஆர்டர் விவரங்கள் (Order Details)</h2>
            
            <div className="customer-info">
              <p><strong>ஆர்டர் எண் (Order ID):</strong> #{selectedOrder.id}</p>
              <p><strong>வாடிக்கையாளர் (Customer):</strong> {selectedOrder.customerName}</p>
              <p><strong>தேதி (Date):</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>நிலை (Status):</strong> {selectedOrder.status}</p>
            </div>

            <div className="items-list-detail">
              <h3>பொருட்கள் (Items):</h3>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="item-detail-row">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="total-row">
              மொத்த தொகை (Total): ₹{selectedOrder.totalAmount}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
