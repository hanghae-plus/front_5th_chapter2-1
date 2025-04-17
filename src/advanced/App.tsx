import { useState, useEffect } from 'react';
import { Product } from './types/product';
import { products } from './data/products';
import CartList from './components/CartList';
import CartTotal from './components/CartTotal';
import StockStatus from './components/StockStatus';
import ProductSelect from './components/ProductSelect';
import { createDiscountEvent } from './utils/createDiscountEvent';

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
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

    const existingCartItem = cartItems.find(({ id }) => id === selectedProductId);

    if (!existingCartItem) {
      setCartItems([...cartItems, { ...selectedProduct, quantity: 1 }]);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.id === selectedProductId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedCartItems);
    }

    setAvailableProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProductId ? { ...product, quantity: product.quantity - 1 } : product,
      ),
    );
  };

  const handleCartItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const productId = target.dataset.productId;

    if (!productId) return;

    if (target.classList.contains('remove-item')) {
      const removedItem = cartItems.find((item) => item.id === productId);
      if (removedItem) {
        setAvailableProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity + removedItem.quantity }
              : product,
          ),
        );
      }
      setCartItems(cartItems.filter((item) => item.id !== productId));
      return;
    }

    if (target.classList.contains('quantity-change')) {
      const change = parseInt(target.dataset.change || '0');
      const product = availableProducts.find((p) => p.id === productId);

      if (!product) return;

      if (change > 0 && product.quantity <= 0) {
        alert('재고가 부족합니다.');
        return;
      }

      const updatedCartItems = cartItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
              setAvailableProducts((prevProducts) =>
                prevProducts.map((product) =>
                  product.id === productId
                    ? { ...product, quantity: product.quantity + item.quantity }
                    : product,
                ),
              );
              return null;
            }
            setAvailableProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === productId
                  ? { ...product, quantity: product.quantity - change }
                  : product,
              ),
            );
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean) as Product[];

      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartList cartItems={cartItems} onCartItemClick={handleCartItemClick} />
        <CartTotal cartItems={cartItems} products={availableProducts} />
        <div className="flex items-center">
          <ProductSelect
            products={availableProducts}
            selectedProductId={selectedProductId}
            onProductSelect={setSelectedProductId}
          />
          <button
            id="add-to-cart"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddToCart}
          >
            추가
          </button>
        </div>
        <StockStatus products={availableProducts} />
      </div>
    </div>
  );
};

export default App;
