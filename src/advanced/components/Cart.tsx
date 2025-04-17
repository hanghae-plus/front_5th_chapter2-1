import { useState } from 'react';
import { Item } from '../types/items';
import CartItem from './CartItem';

const Cart = ({ selectedItem }: { selectedItem: Item }) => {
  const [cartCount] = useState(1);
  console.log(selectedItem);
  return (
    <div id="cart-items">
      {selectedItem && <CartItem selectedItem={selectedItem} cartCount={cartCount} />}
    </div>
  );
};

export default Cart;
