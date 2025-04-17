import { useState, useEffect } from 'react';
import { Cart, CartItem, getCart, updateCart } from '../../../shared/store/cart';
import { 
  Product,
  getProductList,
  updateProductList,
  decreaseProductQuantity,
  findProduct
} from '../../../shared/store/productList';
import { 
  getBonusPts,
  getFinalAmounts,
  getProductQuantityMessage
} from '../../../shared/app/Cart/calculation';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [stockStatus, setStockStatus] = useState<string[]>([]);

  useEffect(() => {
    setCart(getCart());
    setProductList(getProductList());
  }, []);

  useEffect(() => {
    // 총 아이템 수와 총액 계산
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => {
      const product = findProduct(productList, item.productId);
      return sum + (product?.val || 0) * item.quantity;
    }, 0);
    const total = subtotal; // 할인 전 금액

    const { totalAmt, discRate } = getFinalAmounts(itemCount, total, subtotal);
    setTotalAmount(totalAmt);
    setDiscountRate(discRate);
    setBonusPoints(getBonusPts(totalAmt));

    // 재고 상태 업데이트
    const products = getProductList();
    const message = getProductQuantityMessage(products);
    // 줄바꿈으로 구분된 메시지를 배열로 변환하고 빈 문자열 제거
    const messages = message.split('\n').filter(msg => msg.trim() !== '');
    setStockStatus(messages);
  }, [cart, productList]);

  const handleAddToCart = (productId: string) => {
    const product = findProduct(productList, productId);
    if (!product || product.q <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    const newCart = [...cart];
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart.push({ productId, quantity: 1 });
    }

    const newProductList = decreaseProductQuantity(productList, productId);
    
    updateCart(newCart);
    updateProductList(newProductList);
    setCart(newCart);
    setProductList(newProductList);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = findProduct(productList, productId);
    if (!product) return;

    const newCart = cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        if (change > 0 && product.q <= 0) {
          alert('재고가 부족합니다.');
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item): item is CartItem => item !== null);

    const newProductList = decreaseProductQuantity(productList, productId, change);
    
    updateCart(newCart);
    updateProductList(newProductList);
    setCart(newCart);
    setProductList(newProductList);
  };

  const handleRemoveItem = (productId: string) => {
    const itemToRemove = cart.find(item => item.productId === productId);
    if (!itemToRemove) return;

    const newCart = cart.filter(item => item.productId !== productId);
    const newProductList = decreaseProductQuantity(
      productList,
      productId,
      -itemToRemove.quantity
    );

    updateCart(newCart);
    updateProductList(newProductList);
    setCart(newCart);
    setProductList(newProductList);
  };

  return {
    cart,
    totalAmount,
    discountRate,
    bonusPoints,
    handleAddToCart,
    handleQuantityChange,
    handleRemoveItem,
    stockStatus
  };
}; 