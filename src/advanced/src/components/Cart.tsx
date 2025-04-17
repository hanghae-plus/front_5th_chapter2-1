import { useEffect, useState } from 'react';
import Select from './Select';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem extends Product {
  cartQuantity: number;
}

function Cart() {
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const [stockInfo, setStockInfo] = useState<string[]>([]);

  // 할인 alert
  useEffect(() => {
    const flashSaleInterval = setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        const newPrice = Math.round(luckyItem.price * 0.8);
        setProducts((prev) =>
          prev.map((item) =>
            item.id === luckyItem.id ? { ...item, price: newPrice } : item
          )
        );
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
      }
    }, 30000);

    const suggestionInterval = setInterval(() => {
      if (lastSelected) {
        const suggest = products.find(
          (item) => item.id !== lastSelected && item.quantity > 0
        );
        if (suggest) {
          const newPrice = Math.round(suggest.price * 0.95);
          setProducts((prev) =>
            prev.map((item) =>
              item.id === suggest.id ? { ...item, price: newPrice } : item
            )
          );
          alert(
            `${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
          );
        }
      }
    }, 60000);

    return () => {
      clearInterval(flashSaleInterval);
      clearInterval(suggestionInterval);
    };
  }, [products, lastSelected]);

  // 재고 정보 업데이트
  useEffect(() => {
    const lowStockItems = products
      .filter((item) => item.quantity < 5)
      .map(
        (item) =>
          `${item.name}: ${
            item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절'
          }`
      );
    setStockInfo(lowStockItems);
  }, [products]);

  const calculateCart = () => {
    let total = 0;
    let itemCount = 0;
    let subtotal = 0;

    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        const itemTotal = product.price * item.cartQuantity;
        let discount = 0;

        itemCount += item.cartQuantity;
        subtotal += itemTotal;

        // 수량 할인
        if (item.cartQuantity >= 10) {
          switch (item.id) {
            case 'p1':
              discount = 0.1;
              break;
            case 'p2':
              discount = 0.15;
              break;
            case 'p3':
              discount = 0.2;
              break;
            case 'p4':
              discount = 0.05;
              break;
            case 'p5':
              discount = 0.25;
              break;
          }
        }

        total += itemTotal * (1 - discount);
      }
    });

    // 대량 구매 할인
    if (itemCount >= 30) {
      const bulkDiscount = total * 0.25;
      const itemDiscount = subtotal - total;
      if (bulkDiscount > itemDiscount) {
        total = subtotal * 0.75;
        setDiscountRate(0.25);
      } else {
        setDiscountRate((subtotal - total) / subtotal);
      }
    } else {
      setDiscountRate((subtotal - total) / subtotal);
    }

    // 화요일 할인
    if (new Date().getDay() === 2) {
      total *= 0.9;
      setDiscountRate(Math.max(discountRate, 0.1));
    }

    setTotalAmount(Math.round(total));
    setBonusPoints(Math.floor(total / 1000));
  };

  useEffect(() => {
    calculateCart();
  }, [cartItems, products]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 0) {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === productId);
        if (existingItem) {
          if (existingItem.cartQuantity < product.quantity) {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === productId
                  ? { ...product, quantity: product.quantity - 1 }
                  : product
              )
            );
            return prev.map((item) =>
              item.id === productId
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item
            );
          }
          alert('재고가 부족합니다.');
          return prev;
        }
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
        return [...prev, { ...product, cartQuantity: 1 }];
      });
      setLastSelected(productId);
    }
  };

  const handleQuantityChange = (productId: string, change: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        const newQuantity = item.cartQuantity + change;
        if (newQuantity > 0) {
          const product = products.find((p) => p.id === productId);
          if (product) {
            const quantityChange = change;
            if (quantityChange > 0 && product.quantity >= quantityChange) {
              setProducts((prevProducts) =>
                prevProducts.map((product) =>
                  product.id === productId
                    ? {
                        ...product,
                        quantity: product.quantity - quantityChange,
                      }
                    : product
                )
              );
              return prev.map((i) =>
                i.id === productId ? { ...i, cartQuantity: newQuantity } : i
              );
            } else if (quantityChange < 0) {
              setProducts((prevProducts) =>
                prevProducts.map((product) =>
                  product.id === productId
                    ? {
                        ...product,
                        quantity: product.quantity - quantityChange,
                      }
                    : product
                )
              );
              return prev.map((i) =>
                i.id === productId ? { ...i, cartQuantity: newQuantity } : i
              );
            }
            alert('재고가 부족합니다.');
          }
        } else {
          const product = products.find((p) => p.id === productId);
          if (product) {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      quantity: product.quantity + item.cartQuantity,
                    }
                  : product
              )
            );
          }
          return prev.filter((i) => i.id !== productId);
        }
      }
      return prev;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  quantity: product.quantity + item.cartQuantity,
                }
              : product
          )
        );
      }
      return prev.filter((i) => i.id !== productId);
    });
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>장바구니</h1>

      <div id='cart-items' className='mb-4'>
        {cartItems.map((item) => (
          <div key={item.id} className='flex justify-between items-center mb-2'>
            <span>
              {item.name} - {item.price}원 x {item.cartQuantity}
            </span>
            <div>
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className='bg-blue-500 text-white px-2 py-1 rounded mr-1'>
                -
              </button>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className='bg-blue-500 text-white px-2 py-1 rounded mr-1'>
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className='bg-red-500 text-white px-2 py-1 rounded'>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id='cart-total' className='text-xl font-bold my-4'>
        총액: {totalAmount}원
        {discountRate > 0 && (
          <span className='text-green-500 ml-2'>
            ({Math.round(discountRate * 100)}% 할인 적용)
          </span>
        )}
        <span className='text-blue-500 ml-2'>(포인트: {bonusPoints})</span>
      </div>

      <Select products={products} onClick={handleAddToCart} />

      <div
        id='stock-status'
        className='text-sm text-gray-500 mt-2'
        style={{ display: 'flex', gap: '5px' }}>
        {stockInfo.map((info, index) => (
          <span key={index}>{info}</span>
        ))}
      </div>
    </>
  );
}

export default Cart;
