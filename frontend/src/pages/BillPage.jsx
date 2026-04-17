import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBill } from '../services/billService';
import { getOrder } from '../services/orderService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/BillPage.css';

const BillPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillAndOrder = async () => {
      try {
        setLoading(true);
        const orderRes = await getOrder(orderId);
        setOrder(orderRes.data);
        
        const billRes = await getBill(orderId);
        if (billRes.data) {
          setBill(billRes.data);
        }
      } catch (err) {
        setError('Failed to load bill details');
      } finally {
        setLoading(false);
      }
    };
    fetchBillAndOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!order) return <Alert type="error" message="Order not found" />;

  // If no bill exists yet, show message
  if (!bill) {
    return (
      <div className="bill-page">
        <div className="bill-card card">
          <Alert type="info" message="Bill not generated yet. Please wait for shopkeeper to generate the bill." />
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Orders</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bill-page">
      <div className="bill-card card">
        <div className="bill-header">
          <h1>பலசரக்கு கடை (Provision Store)</h1>
          <h2>பில் / Bill</h2>
        </div>

        <div className="bill-info">
          <p><strong>பில் எண் (Bill No):</strong> {bill?.id || orderId}</p>
          <p><strong>தேதி (Date):</strong> {new Date(bill?.createdAt || order.createdAt).toLocaleString()}</p>
        </div>

        <div className="bill-customer">
          <p><strong>வாடிக்கையாளர் (Customer):</strong> {bill?.customerName || 'N/A'}</p>
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
            {(bill?.items || order.items).map((item, index) => (
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
              <td><strong>₹{bill?.totalAmount || order.totalAmount}</strong></td>
            </tr>
          </tfoot>
        </table>

        <div className="bill-footer">
          <p>கட்டண முறை (Payment): {bill?.paymentMethod || 'cash'}</p>
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

export default BillPage;