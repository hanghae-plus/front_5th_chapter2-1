import React, { useState, useEffect, useRef } from 'react';
import CartItems from './components/CartItems';
import CartTotal from './components/CartTotal';
import ProductSelect from './components/ProductSelect';
import AddToCartButton from './components/AddToCartButton';
import ItemStatus from './components/ItemStatus';
import { calcCart } from './utils/calcCart';
import { setEvents } from './utils/event';
// import { notifyEvent, notifyDiscount } from './utils/notifyEvents';
import { prodList } from './constants';
import { CartItemType, ProductType } from './types';

export default function App() {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>(prodList[0]);
    const [lastSel, setLastSel] = useState<ProductType>(prodList[0]);

    const cartRef = useRef<CartItemType[]>(cart);

    useEffect(() => {
        setLastSel(selectedProduct);
    }, []);

    useEffect(() => {
        cartRef.current = cart;
    }, [cart])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          const intervalId = setInterval(() => {
            if (!lastSel) return;
      
            const candidates = prodList.filter(
              (item) => item.id !== lastSel.id && item.quantity > 0
            );
      
            if (candidates.length > 0) {
              const suggest =
                candidates[Math.floor(Math.random() * candidates.length)];
              alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      
              const suggestOrder = prodList.findIndex(
                (item) => item.id === suggest.id
              );
              console.log('cartRef.current:', cartRef.current);

              prodList[suggestOrder].price = Math.round(
                prodList[suggestOrder].price * 0.95
              );

              //cart에 없다면
              console.log('prodList:', prodList);
              if(cartRef.current.find((item) => item.id === suggest.id)) {

                setCart((prevCart) => {
                    return prevCart.map((cartItem) =>
                        cartItem.id === suggest.id
                            ? { ...cartItem, price: Math.round(cartItem.price * 0.95) }
                            : cartItem
                    );
                });
              } else {
                // cart에 없는 항목이 할인인데. 렌더링 트리거를 위해 그냥 setCart를 호출한다.
                setCart((prevCart) => {
                    return [...prevCart];
                })
              }

              console.log('cartRef.current:', cartRef.current);
            }
          }, 10000); // 60초마다
      
          // 클린업 함수에서 clearInterval
          return () => clearInterval(intervalId);
        }, Math.random() * 4000);
      
        // 클린업에서 clearTimeout (혹시라도 컴포넌트 언마운트 시 취소를 위해)
        return () => clearTimeout(timeoutId);
      }, [lastSel]);


    const addToCart = (item: CartItemType) => {
        setCart((prevCart) => {
            return prevCart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, count: cartItem.count + 1 }
                    : cartItem
            );
        });
    };

    const removeFromCart = (item: CartItemType) => {
        setCart((prevCart) => {
            return prevCart
                .map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, count: cartItem.count - 1 }
                        : cartItem
                )
                .filter((cartItem) => cartItem.count > 0); // 수량이 0인 경우 제거
        });
    };

    const addButtonToCart = () => {
        console.log('cart:', cart);
        if (selectedProduct) {
            const existingItem = cart.find((item) => item.id === selectedProduct.id);
            if (existingItem && existingItem.count >= selectedProduct.quantity || selectedProduct.quantity <= 0) {
                return alert('재고가 부족합니다.');
            }
            console.log(existingItem && existingItem.count, selectedProduct.quantity);
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === selectedProduct.id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.id === selectedProduct.id
                            ? { ...item, count: item.count + 1 }
                            : item
                    );
                } else {
                    return [...prevCart, { ...selectedProduct, count: 1 }];
                }
            });
        }
    };

    const deleteAllFromCart = (item: CartItemType) => {
        setCart((prevCart) => {
            return prevCart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, count: 0 }
                    : cartItem
            ).filter((cartItem) => cartItem.count > 0);
        });
    }

    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <h1 className="text-2xl font-bold mb-4">장바구니</h1>
                <CartItems items={cart} addToCart={addToCart} removeFromCart={removeFromCart} deleteAllFromCart={deleteAllFromCart} />
                <CartTotal cartList={cart} />
                <ProductSelect prodList={prodList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                <AddToCartButton addToCart={addButtonToCart} />
                <ItemStatus cartList={cart} />
            </div>
        </div>
    );
}