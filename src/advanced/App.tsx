import { useReducer, useState, useEffect } from 'react';
import { Product } from './types/product';
import { products } from './data/products';
import CartList from './components/CartList';
import { CartTotal } from './components/CartTotal';
import StockStatus from './components/StockStatus';
import ProductSelect from './components/ProductSelect';
import { createDiscountEvent } from './utils/createDiscountEvent';
import { cartReducer } from './reducers/cartReducer';
import { CartState } from './types/cart';

const initialCartState: CartState = {
  items: [],
  totalPrice: 0,
  discountRate: 0,
  bonusPoints: 0,
};

const App = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [availableProducts, setAvailableProducts] = useState<Product[]>([...products]);

  useEffect(() => {
    const firstAvailableProduct = availableProducts.find((p) => p.quantity > 0);
    if (firstAvailableProduct) {
      setSelectedProductId(firstAvailableProduct.id);
    }
  }, [availableProducts]);

  useEffect(() => {
    createDiscountEvent(availableProducts, setAvailableProducts);
  }, []);

  const handleAddToCart = () => {
    const selectedProduct = availableProducts.find(({ id }) => id === selectedProductId);

    if (!selectedProduct) {
      alert('상품을 선택해주세요.');
      return;
    }

    if (selectedProduct.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    dispatch({ type: 'ADD_ITEM', payload: selectedProduct });
    setAvailableProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProductId ? { ...product, quantity: product.quantity - 1 } : product,
      ),
    );
  };

  const handleQuantityChange = (id: string, change: number) => {
    const product = availableProducts.find((p) => p.id === id);
    if (!product) return;

    if (change > 0 && product.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } });
    setAvailableProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity - change } : product,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    const removedItem = cartState.items.find((item) => item.id === id);
    if (removedItem) {
      setAvailableProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + removedItem.quantity }
            : product,
        ),
      );
    }
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartList
          items={cartState.items}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
        <CartTotal
          totalPrice={cartState.totalPrice}
          discountRate={cartState.discountRate}
          bonusPoints={cartState.bonusPoints}
        />
        <div className="flex items-center">
          <ProductSelect
            products={availableProducts}
            selectedProductId={selectedProductId}
            onProductSelect={setSelectedProductId}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
            추가
          </button>
        </div>
        <StockStatus products={availableProducts} />
      </div>
    </div>
  );
};

export default App;
