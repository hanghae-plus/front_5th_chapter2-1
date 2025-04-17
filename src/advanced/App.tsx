import { useState, useEffect, useRef } from 'react';
import { Product } from './types/product';
import { products } from './data/products';
import { createDiscountEvent } from './utils/createDiscountEvent';
import { createNewCartItem } from './utils/createNewCartItem';
import { updateCartTotal } from './utils/updateCartTotal';
import { updateSelectBoxOptions } from './utils/updateSelectBoxOption';
import { handleCartItemEvent } from './utils/cartItemEventHandler';

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const productSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const $productSelect = productSelectRef.current;
    if ($productSelect) {
      updateSelectBoxOptions($productSelect, products);

      const firstAvailableProduct = products.find((p) => p.quantity > 0);
      if (firstAvailableProduct) {
        setSelectedProductId(firstAvailableProduct.id);
      }
    }
  }, []);

  useEffect(() => {
    const $cartList = document.getElementById('cart-items');
    const $cartTotalPrice = document.getElementById('cart-total');
    const $stockStatus = document.getElementById('stock-status');

    if ($cartList && $cartTotalPrice && $stockStatus) {
      updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
    }

    createDiscountEvent(products);
  }, []);

  const handleAddToCart = () => {
    const selectedProduct = products.find(({ id }) => id === selectedProductId);

    if (!selectedProduct) {
      alert('상품을 선택해주세요.');
      return;
    }

    if (selectedProduct.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    const existingCartItem = cartItems.find(({ id }) => id === selectedProductId);
    const $cartList = document.getElementById('cart-items');

    if (!$cartList) return;

    if (!existingCartItem) {
      createNewCartItem($cartList, selectedProduct);
      setCartItems([...cartItems, { ...selectedProduct, quantity: 1 }]);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.id === selectedProductId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedCartItems);

      const $cartItem = document.getElementById(selectedProductId);
      if ($cartItem) {
        const $span = $cartItem.querySelector('span');
        if ($span) {
          const currentQuantity = parseInt($span.textContent?.split('x ')[1] || '0');
          $span.textContent = `${$span.textContent?.split('x ')[0]}x ${currentQuantity + 1}`;
        }
      }
    }

    const $cartTotalPrice = document.getElementById('cart-total');
    const $stockStatus = document.getElementById('stock-status');
    const $productSelect = productSelectRef.current;

    if ($cartTotalPrice && $stockStatus && $productSelect) {
      updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
      updateSelectBoxOptions($productSelect, products);
    }
  };

  const handleCartItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const $cartList = document.getElementById('cart-items');
    const $cartTotalPrice = document.getElementById('cart-total');
    const $stockStatus = document.getElementById('stock-status');
    const $productSelect = productSelectRef.current;

    if ($cartList && $cartTotalPrice && $stockStatus && $productSelect) {
      handleCartItemEvent(event, $cartList, $cartTotalPrice, $stockStatus);
      updateSelectBoxOptions($productSelect, products);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items" className="mb-4" onClick={handleCartItemClick} />
        <div id="cart-total" className="text-xl font-bold my-4" />
        <select
          ref={productSelectRef}
          id="product-select"
          className="border rounded p-2 mr-2"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        />
        <button
          id="add-to-cart"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          추가
        </button>
        <div id="stock-status" className="text-sm text-gray-500 mt-2" />
      </div>
    </div>
  );
};

export default App;
