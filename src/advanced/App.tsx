import React, { useState, useEffect } from "react";
import { PRODUCT_LIST } from "./data/productData";
import Container from "./components/Container";
import Wrapper from "./components/Wrapper";
import CartDisplay from "./components/CartDisplay";
import TotalAmount from "./components/TotalAmount";
import ProductSelector from "./components/ProductSelector";
import ProductStock from "./components/ProductStock";
import { CartItem, Product } from "./types";
import { cartEvents } from "./events/cartEvents";
import { usePromotion } from "./services/promotion";

// import "./App.css";

// 필요한 타입 가져오기 (예: 기존 데이터를 TypeScript로 변환한 경우)
// import { Product } from './types';
// import { productList } from './data/productData';

const App: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>(PRODUCT_LIST);

    // 첫 번째 상품 ID로 초기화
    const [selectedProductId, setSelectedProductId] = useState<string>(
        products.length > 0 ? products[0].id : ""
    );
    const [lastSelected, setLastSelected] = useState<string | null>(null);

    // 커스텀 훅 사용
    usePromotion(products, lastSelected, setProducts);

    const handleAddToCart = () => {
        const selectedProduct = products.find(
            (p) => p.id === selectedProductId
        );

        if (selectedProduct) {
            cartEvents.addToCart(
                selectedProduct,
                cartItems,
                setCartItems,
                products,
                setProducts
                // setLastSelected
            );
        }
    };

    const handleProductChange = (productId: string) => {
        setSelectedProductId(productId);
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (productId: string, change: number) => {
        console.log("handleQuantityChange");
        console.log("products: ", products);

        cartEvents.updateQuantity(
            productId,
            change,
            cartItems,
            setCartItems,
            products,
            setProducts
        );
    };

    // 상품 제거 핸들러
    const handleRemoveItem = (productId: string) => {
        cartEvents.removeItem(productId, cartItems, setCartItems);
    };

    return (
        <Container>
            <Wrapper>
                <h2 className="text-2xl font-bold mb-4">장바구니</h2>
                <CartDisplay
                    cartItems={cartItems}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                />
                <TotalAmount cartItems={cartItems} productList={products} />
                <ProductSelector
                    productList={products}
                    onAddToCart={handleAddToCart}
                    onChange={handleProductChange}
                />
                <ProductStock productList={products} />
            </Wrapper>
        </Container>
    );
};

export default App;
