import React, { useEffect, useState } from 'react';
import CartLayout from './components/CartLayout';
import ProductSelector from './components/ProductSelector';
import CartSummary from './components/CartSummary';
import CartItemList from './components/CartItemList';
import StockStatus from './components/StockStatus';

import { Product, CartItem } from './types/product';
import { INITIAL_PRODUCTS } from './constants/constants';
import { useSaleTimer } from './hooks/useSaleTimer';

const App = () => {
    const [productList, setProductList] = useState<Product[]>(INITIAL_PRODUCTS);
    const [lastSelectedProduct, setLastSelectedProduct] = useState<Product | null>(null);
    const [bonusPoints, setBonusPoints] = useState(0);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleCartChange = (updatedCart: CartItem[]) => {
        console.log('장바구니 업데이트:', updatedCart);
        setCartItems(updatedCart);
    };

    // 번개세일 및 추천 할인 훅
    useSaleTimer(productList, setProductList, lastSelectedProduct);

    return (
        <div className="max-w-4xl mx-auto">
            <CartLayout>
                <CartItemList cartItems={cartItems}
                    setCartItems={setCartItems}
                    productList={productList}
                    setProductList={setProductList} />
                <CartSummary cartItems={cartItems} />
                <ProductSelector
                    productList={productList}
                    setProductList={setProductList}
                    lastSelectedProduct={lastSelectedProduct}
                    setLastSelectedProduct={setLastSelectedProduct}
                    bonusPoints={bonusPoints}
                    setBonusPoints={setBonusPoints}
                    cartItems={cartItems}
                    onCartChange={handleCartChange} />
                <StockStatus productList={productList} />
            </CartLayout>
        </div>
    );
};

export default App;
