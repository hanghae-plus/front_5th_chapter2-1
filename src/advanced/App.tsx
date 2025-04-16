import React, { useEffect, useState } from 'react';
import CartLayout from './components/CartLayout';
import ProductSelector from './components/ProductSelector';
import CartSummary from './components/CartSummary';
import CartItemList from './components/CartItemList';
import StockStatus from './components/StockStatus';

import { Product, CartItem } from './types/product';
import { INITIAL_PRODUCTS } from './constants/constants';
// import { saleTimer } from '../utils/saleTimer';
// import { calculateCart } from '../utils/cart';

const App = () => {
    const [productList, setProductList] = useState<Product[]>(INITIAL_PRODUCTS);
    const [lastSelectedProduct, setLastSelectedProduct] = useState<Product | null>(null);
    const [bonusPoints, setBonusPoints] = useState(0);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleCartChange = (updatedCart: CartItem[]) => {
        console.log('장바구니 업데이트:', updatedCart);
        setCartItems(updatedCart);
    };

    useEffect(() => {
        // 할인 타이머 (예시)
        // saleTimer(productList, lastSelectedProduct, () => {
        //     // 필요하면 옵션 업데이트 등
        // });
    }, [productList, lastSelectedProduct]);

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
