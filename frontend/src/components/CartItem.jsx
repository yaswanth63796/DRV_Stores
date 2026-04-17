import React from 'react';
import '../styles/CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  return (
    <div className="cart-item card">
      <div className="cart-item-info">
        <h4>{product.name}</h4>
        <p>Price: ₹{product.price}</p>
        <p>Subtotal: ₹{product.price * quantity}</p>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => onUpdateQuantity(product.id, parseInt(e.target.value))}
        />
        <button className="btn btn-danger" onClick={() => onRemove(product.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;