import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-success-container">
            <div className="success-card">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#2d6a4f"/>
                    </svg>
                </div>
                <h1>பணம் செலுத்தப்பட்டது! (Payment Successful)</h1>
                <p>உங்களது ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது.</p>
                <p>Your order has been placed successfully. Thank you for shopping with DRV Stores!</p>
                <div className="action-buttons">
                    <button className="btn btn-primary" onClick={() => navigate('/customer/orders')}>
                        ஆர்டர்களைக் காண்க (View Orders)
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/customer/products')}>
                        தொடர்ந்து வாங்க (Continue Shopping)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
