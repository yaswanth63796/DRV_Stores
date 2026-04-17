import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import { generateBill } from '../services/billService';
import api from '../services/api';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, billsRes] = await Promise.all([
        getOrders(),
        api.get('/bills')
      ]);
      setOrders(ordersRes.data);
      setBills(billsRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBill = async (order) => {
    try {
      // Fetch user details
      const userRes = await api.get(`/users/${order.userId}`);
      const user = userRes.data;
      
      const billData = {
        id: Date.now().toString(),
        orderId: order.id,
        userId: order.userId,
        customerName: user.name || user.username || 'Customer',
        items: order.items,
        totalAmount: order.totalAmount,
        paymentMethod: 'cash',
        status: 'paid',
        createdAt: new Date().toISOString()
      };
      
      await generateBill(order.id, billData);
      setSuccess(`Bill generated for Order #${order.id}`);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to generate bill');
    }
  };

  const handleViewBill = (billId) => {
    navigate(`/shopkeeper/view-bill/${billId}`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>நிர்வாக பலகை (Admin Dashboard)</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/shopkeeper/create-bill')}
        >
          + புதிய பில் உருவாக்கு (Create New Bill)
        </button>
      </div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

      <div className="orders-section card">
        <h2>ஆர்டர்கள் (Orders)</h2>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ஆர்டர் எண் (Order ID)</th>
                <th>தேதி (Date)</th>
                <th>பொருட்கள் (Items)</th>
                <th>மொத்தம் (Total)</th>
                <th>நிலை (Status)</th>
                <th>செயல்கள் (Actions)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.items.length} items</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleGenerateBill(order)}
                    >
                      பில் உருவாக்கு (Generate Bill)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bills-section card">
        <h2>பில்கள் (Bills)</h2>
        {bills.length === 0 ? (
          <p>No bills found</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>பில் எண் (Bill ID)</th>
                <th>வாடிக்கையாளர் (Customer)</th>
                <th>தேதி (Date)</th>
                <th>மொத்தம் (Total)</th>
                <th>செயல்கள் (Actions)</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.id}>
                  <td>#{bill.id}</td>
                  <td>{bill.customerName || 'N/A'}</td>
                  <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                  <td>₹{bill.totalAmount}</td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={() => handleViewBill(bill.id)}
                    >
                      பார்க்க (View)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
