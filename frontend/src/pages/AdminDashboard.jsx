import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBill } from '../services/billService';
import api from '../services/api';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
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
      const billsRes = await api.get('/bills');
      setBills(billsRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };



  const handleViewBill = (billId) => {
    navigate(`/shopkeeper/view-bill/${billId}`);
  };

  const handleDeleteBill = async (billId) => {
    if (window.confirm('இந்த பில்லை நீக்க விரும்புகிறீர்களா? (Are you sure you want to delete this bill?)')) {
      try {
        await deleteBill(billId);
        setSuccess('பில் வெற்றிகரமாக நீக்கப்பட்டது (Bill deleted successfully)');
        fetchData();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete bill');
      }
    }
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
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => handleDeleteBill(bill.id)}
                      style={{ marginLeft: '10px' }}
                    >
                      நீக்கு (Delete)
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
