import { useState } from 'react';
import { ProductSelect } from './components/ProductSelect';
import { CartList } from './components/CartList';
import { Summary } from './components/Summary';
import { Product, CartItem } from './types';
import { usePromotionEffects, useCart } from './hooks/index';
import { getStockInfoMessage } from './utils';

const mockProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

const App = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const { addToCart, changeQuantity, removeItem } = useCart(
    products,
    setProducts,
    cartItems,
    setCartItems
  );

  usePromotionEffects({
    setProducts,
    lastSelectedProductId: selectedProductId,
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      <CartList
        cartItems={cartItems}
        products={products}
        actions={{
          onChangeQuantity: changeQuantity,
          onRemoveItem: removeItem,
        }}
      />

      <Summary cartItems={cartItems} products={products} />

      <ProductSelect
        products={products}
        selectedId={selectedProductId}
        actions={{
          onChange: setSelectedProductId,
          onAddToCart: addToCart,
        }}
      />
      <div className="text-sm text-gray-500 mt-2">
        {getStockInfoMessage(products)}
      </div>
    </div>
  );
};

export default App;
