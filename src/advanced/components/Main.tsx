import { useState } from 'react';

import { useProducts } from '../contexts/ProductsContext';

import { useCart } from '../hooks/useCart';
import ProductSelect from './ProductSelect';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import StockStatus from './StockStatus';

export function Main() {
  const { products, updateUnits, lastSelectedRef } = useProducts();
  const { cart, addItem, updateQuantity, removeItem } = useCart();
  const [selectedId, setSelectedId] = useState(
    products.find((product) => product.units > 0)?.id ?? products[0].id
  );

  const handleAdd = () => {
    const product = products.find((product) => product.id === selectedId);
    if (!product || product.units <= 0) {
      alert('상품이 품절되었습니다.');
      return;
    }
    addItem(product);
    updateUnits(product.id, -1);
    lastSelectedRef.current = product.id;
  };

  const handleChange = (id: string, delta: number) => {
    updateQuantity(id, delta);
    updateUnits(id, -delta);
  };

  const handleRemove = (id: string) => {
    const item = cart.find((i) => i.id === id)!;
    removeItem(id);
    updateUnits(id, item.quantity);
  };

  return (
    <div className="product-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItems cart={cart} onQuantityChange={handleChange} onRemoveItem={handleRemove} />
      <CartTotal cart={cart} products={products} />
      <ProductSelect selectedId={selectedId} onSelect={setSelectedId} onAdd={handleAdd} />
      <StockStatus products={products} />
    </div>
  );
}
