import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { getProducts, deleteProduct } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../styles/ProductListPage.css';

const ProductListPage = () => {
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setSuccess(`${product.name} added to cart!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading) return <Spinner />;

  return (
    <div className="product-list-container">
      <h1>{user?.role === 'shopkeeper' ? 'Manage Products' : 'Available Products'}</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
      
      {user?.role === 'shopkeeper' && (
        <button className="btn btn-primary add-product-btn" onClick={() => navigate('/shopkeeper/add-product')}>
          Add New Product
        </button>
      )}

      {user?.role === 'customer' && cartItems.length > 0 && (
        <div className="cart-indicator">
          <button className="btn btn-primary" onClick={() => navigate('/customer/cart')}>
            🛒 View Cart ({cartItems.length} items)
          </button>
        </div>
      )}

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(product) => navigate(`/shopkeeper/edit-product/${product.id}`)}
              onDelete={handleDelete}
              onAddToCart={handleAddToCart}
              showActions={user?.role}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListPage;