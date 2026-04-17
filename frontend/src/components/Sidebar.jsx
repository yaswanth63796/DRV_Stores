import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DRV STORES</h2>
      </div>
      
      <div className="sidebar-menu">
        {user?.role === 'shopkeeper' && (
          <>
            <p className="menu-label">Main Menu</p>
            <Link to="/shopkeeper/dashboard" className={`sidebar-link ${isActive('/shopkeeper/dashboard') ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/shopkeeper/orders" className={`sidebar-link ${isActive('/shopkeeper/orders') ? 'active' : ''}`}>Orders</Link>
            <Link to="/shopkeeper/products" className={`sidebar-link ${isActive('/shopkeeper/products') ? 'active' : ''}`}>Products</Link>
            <Link to="/shopkeeper/add-product" className={`sidebar-link ${isActive('/shopkeeper/add-product') ? 'active' : ''}`}>Add Product</Link>
            <Link to="/shopkeeper/create-bill" className={`sidebar-link ${isActive('/shopkeeper/create-bill') ? 'active' : ''}`}>Create Bill</Link>
            <Link to="/shopkeeper/admin" className={`sidebar-link ${isActive('/shopkeeper/admin') ? 'active' : ''}`}>Admin Staff</Link>
          </>
        )}
        
        {user?.role === 'customer' && (
          <>
            <p className="menu-label">My Account</p>
            <Link to="/customer/dashboard" className={`sidebar-link ${isActive('/customer/dashboard') ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/customer/products" className={`sidebar-link ${isActive('/customer/products') ? 'active' : ''}`}>Browse Products</Link>
            <Link to="/customer/cart" className={`sidebar-link ${isActive('/customer/cart') ? 'active' : ''}`}>My Cart</Link>
            <Link to="/customer/orders" className={`sidebar-link ${isActive('/customer/orders') ? 'active' : ''}`}>Order History</Link>
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <span className="username">{user?.username}</span>
            <span className="role">{user?.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-logout-sidebar">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
