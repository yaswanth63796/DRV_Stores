import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/BillPage.css';

const ViewBillPage = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBill = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/bills/${billId}`);
        setBill(response.data);
      } catch (err) {
        setError('Failed to load bill');
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [billId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Spinner />;
  if (!bill) return <Alert type="error" message="Bill not found" />;

  return (
    <div className="bill-page">
      <div className="bill-card card">
        <div className="bill-header">
          <h1>பலசரக்கு கடை (Provision Store)</h1>
          <h2>பில் / Bill</h2>
        </div>

        <div className="bill-info">
          <p><strong>பில் எண் (Bill No):</strong> {bill.id}</p>
          <p><strong>தேதி (Date):</strong> {new Date(bill.createdAt).toLocaleString()}</p>
        </div>

        <div className="bill-customer">
          <p><strong>வாடிக்கையாளர் (Customer):</strong> {bill.customerName}</p>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>பொருள் (Item)</th>
              <th>அளவு (Qty)</th>
              <th>விலை (Price)</th>
              <th>மொத்தம் (Total)</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right"><strong>மொத்த தொகை (Total Amount)</strong></td>
              <td><strong>₹{bill.totalAmount}</strong></td>
            </tr>
          </tfoot>
        </table>

        <div className="bill-footer">
          <p>கட்டண முறை (Payment): {bill.paymentMethod || 'cash'}</p>
          <p>நன்றி! வாங்க (Thank you!)</p>
        </div>

        <div className="bill-actions">
          <button className="btn btn-primary" onClick={handlePrint}>Print Bill</button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default ViewBillPage;
