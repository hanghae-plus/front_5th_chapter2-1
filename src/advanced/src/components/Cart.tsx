import { useState } from 'react';
import Select from './Select';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function Cart() {
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ]);

  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>장바구니</h1>
      <div id='cart-items'></div>
      <div id='cart-total' className='text-xl font-bold my-4 text-xl my-4'>
        총액:
      </div>
      <Select products={products} />
      <div id='stock-status' className='text-sm text-gray-500 mt-2'></div>
    </>
  );
}

export default Cart;
