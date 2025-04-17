import React from 'react';

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <button
        onClick={() => onQuantityChange(product.id, product.quantity - 1)}
      >
        -
      </button>
      <span>{product.quantity}</span>
      <button
        onClick={() => onQuantityChange(product.id, product.quantity + 1)}
      >
        +
      </button>
      <button onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
