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

  const handleDelete = async (orderId) => {
    if (window.confirm('இந்த ஆர்டரை நிரந்தரமாக நீக்க விரும்புகிறீர்களா? (Delete this order permanently?)')) {
      try {
        await deleteOrder(orderId);
        setSuccess('ஆர்டர் நீக்கப்பட்டது (Order Deleted)');
        fetchOrders();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete order');
      }
    }
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
              <th>பேமெண்ட் நிலை (Payment)</th>
              <th>ஆர்டர் நிலை (Status)</th>
              <th>பணம் செலுத்திய ID (Payment ID)</th>
              <th>செயல்கள் (Actions)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const itemsList = order.items.map(item => `${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('\n');
              const shareMessage = `வணக்கம்! (Hello!)\n\nA new order has been placed on DRV Stores.\n\nOrder Details:\n- Order ID: #${order.id}\n- Customer: ${order.customerName || 'N/A'}\n- Order Status: ${order.status}\n- Payment Status: ${order.paymentStatus}\n- Payment ID: ${order.paymentId || 'N/A'}\n\nItems List:\n${itemsList}\n\nTotal Bill Amount: ₹${order.totalAmount}\n\nRegards,\nDRV Stores Automated System`;
              const mailLink = `mailto:yeshuv24@gmail.com?subject=Order Confirmation - #${order.id}&body=${encodeURIComponent(shareMessage)}`;

              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName || 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`status-badge payment-${order.paymentStatus ? order.paymentStatus.toLowerCase() : 'pending'}`}>
                      {order.paymentStatus || 'PENDING'}
                    </span>
                  </td>
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
                  <td>{order.paymentId || '---'}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={() => viewDetails(order)}
                    >
                      Details
                    </button>
                    <a href={mailLink} className="btn-icon mail" title="Email Notification">
                      <svg viewBox="0 0 24 24" width="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </a>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(order.id)}
                      title="Delete Order"
                    >
                      <svg viewBox="0 0 24 24" width="20" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
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
              <p><strong>பேமெண்ட் நிலை (Payment Status):</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>ஆர்டர் நிலை (Status):</strong> {selectedOrder.status}</p>
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
