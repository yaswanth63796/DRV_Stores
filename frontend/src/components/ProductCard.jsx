import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, showActions }) => {
  return (
    <div className="product-card card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">Category: {product.category}</p>
      <p className="product-price">Price: ₹{product.price}</p>
      <p className="product-quantity">Available: {product.stock}</p>
      {product.stock <= 5 && (
        <p className="low-stock">Low Stock!</p>
      )}
      <div className="product-actions">
        {showActions === 'shopkeeper' && (
          <>
            <button className="btn btn-secondary" onClick={() => onEdit(product)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
          </>
        )}
        {showActions === 'customer' && product.stock > 0 && (
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;