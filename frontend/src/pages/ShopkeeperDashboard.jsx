import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getLowStockProducts } from '../services/productService';
import { getOrders } from '../services/orderService';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/ShopkeeperDashboard.css';

const ShopkeeperDashboard = () => {
  const { user } = useAuth();
  const [lowStock, setLowStock] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [lowStockRes, ordersRes] = await Promise.all([
          getLowStockProducts(),
          getOrders()
        ]);
        setLowStock(lowStockRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5)); // last 5 orders
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username} (Shopkeeper)</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      <div className="dashboard-stats">
        <div className="stat-card card">
          <h3>Low Stock Products</h3>
          <p className="stat-number">{lowStock.length}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/shopkeeper/products')}>
            View Products
          </button>
        </div>
        <div className="stat-card card">
          <h3>Create Bill</h3>
          <p className="stat-number">பில்</p>
          <button className="btn btn-primary" onClick={() => navigate('/shopkeeper/create-bill')}>
            புதிய பில் (New Bill)
          </button>
        </div>
        <div className="stat-card card">
          <h3>Total Orders</h3>
          <p className="stat-number">{recentOrders.length}+</p>
          <button className="btn btn-secondary" onClick={() => navigate('/shopkeeper/admin')}>
            Admin Dashboard
          </button>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section card">
          <h2>Low Stock Alerts</h2>
          {lowStock.length === 0 ? (
            <p>No low stock products</p>
          ) : (
            <ul className="alert-list">
              {lowStock.map(product => (
                <li key={product.id}>
                  {product.name} - Only {product.stock} left
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="section card">
          <h2>Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <ul className="order-list">
              {recentOrders.map(order => (
                <li key={order.id}>
                  Order #{order.id} - ₹{order.totalAmount}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;