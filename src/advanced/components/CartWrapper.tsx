import { useState } from 'react';
import { CartItem, Product } from '../types';
import Header from './Header';
import ProductSelect from './ProductSelect';
import CartItems from './CartItems';

// 초기 상품 데이터
const initialProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

interface CartItem {
  product: Product;
  quantity: number;
}

const CartWrapper = () => {
  // 상품 목록 상태 관리
  const [products, setProducts] = useState<Product[]>(initialProducts);
  // 장바구니 아이템 상태 관리
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 상품 재고 감소
  const decreaseProductStock = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // 장바구니에 상품 추가 또는 수량 증가
  const updateCartItems = (selectedProduct: Product) => {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === selectedProduct.id
    );

    if (existingCartItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { product: selectedProduct, quantity: 1 },
      ]);
    }
  };

  const handleProductAdd = (selectedProduct: Product) => {
    if (!selectedProduct || selectedProduct.quantity <= 0) {
      alert('선택할 수 없는 상품입니다.');
      return;
    }

    updateCartItems(selectedProduct);
    decreaseProductStock(selectedProduct.id);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // 수량 증가시 재고 체크
    if (change > 0 && product.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + change }
              : item
          )
          .filter((item) => item.quantity > 0) // 수량이 0이 되면 자동 제거
    );

    // 재고 수정
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - change } : p
      )
    );
  };

  const handleRemove = (productId: string) => {
    const itemToRemove = cartItems.find(
      (item) => item.product.id === productId
    );
    if (!itemToRemove) return;

    // 재고 반환
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity + itemToRemove.quantity }
          : p
      )
    );

    // 장바구니에서 제거
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <Header />
      <CartItems
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
      />
      <ProductSelect
        products={products}
        onProductAdd={handleProductAdd}
        disabled={products.every((p) => p.quantity === 0)}
      />
      
    </div>
  );
};

export default CartWrapper;
