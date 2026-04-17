import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { generateBill } from '../services/billService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/CreateBillPage.css';

const CreateBillPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const addItem = () => {
    setItems([...items, { productId: '', name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      if (product) {
        newItems[index] = {
          productId: product.id,
          name: product.name,
          quantity: newItems[index].quantity,
          price: product.price
        };
      }
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      setError('வாடிக்கையாளர் பெயர் தேவை (Customer name required)');
      return;
    }

    if (items.length === 0) {
      setError('குறைந்தது ஒரு பொருள் சேர்க்கவும் (Add at least one item)');
      return;
    }

    try {
      setLoading(true);
      const billData = {
        id: Date.now().toString(),
        orderId: null,
        userId: null,
        customerName: customerName.trim(),
        items: items,
        totalAmount: calculateTotal(),
        paymentMethod: 'cash',
        status: 'paid',
        createdAt: new Date().toISOString()
      };

      await generateBill(null, billData);
      setSuccess('பில் வெற்றிகரமாக உருவாக்கப்பட்டது! (Bill created successfully!)');
      
      setTimeout(() => {
        navigate('/shopkeeper/admin');
      }, 2000);
    } catch (err) {
      setError('Failed to create bill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-bill-page">
      <div className="create-bill-card card">
        <h1>புதிய பில் உருவாக்கு (Create New Bill)</h1>
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>வாடிக்கையாளர் பெயர் (Customer Name) *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="items-section">
            <div className="items-header">
              <h3>பொருட்கள் (Items)</h3>
              <button type="button" className="btn btn-secondary" onClick={addItem}>
                + பொருள் சேர் (Add Item)
              </button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="item-row">
                <select
                  value={item.productId}
                  onChange={(e) => updateItem(index, 'productId', e.target.value)}
                  required
                >
                  <option value="">பொருள் தேர்வு (Select Product)</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ₹{product.price}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                  placeholder="அளவு (Qty)"
                  required
                />

                <input
                  type="number"
                  value={item.price}
                  readOnly
                  placeholder="விலை (Price)"
                />

                <span className="item-total">₹{item.price * item.quantity}</span>

                <button
                  type="button"
                  className="btn btn-danger btn-small"
                  onClick={() => removeItem(index)}
                >
                  நீக்கு (Remove)
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <p className="no-items">பொருட்கள் இல்லை. "பொருள் சேர்" பொத்தானை கிளிக் செய்யவும்.</p>
            )}
          </div>

          <div className="bill-summary">
            <h3>மொத்த தொகை (Total Amount): ₹{calculateTotal()}</h3>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Spinner inline /> : 'பில் உருவாக்கு (Create Bill)'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/shopkeeper/admin')}
            >
              ரத்து (Cancel)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBillPage;
