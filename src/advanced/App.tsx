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

// import "./App.css";

// 필요한 타입 가져오기 (예: 기존 데이터를 TypeScript로 변환한 경우)
// import { Product } from './types';
// import { productList } from './data/productData';

const App: React.FC = () => {
    console.log(PRODUCT_LIST);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>(PRODUCT_LIST);
    // 첫 번째 상품 ID로 초기화
    const [selectedProductId, setSelectedProductId] = useState<string>(
        products.length > 0 ? products[0].id : ""
    );

    const handleAddToCart = () => {
        console.log("추가 버튼 클릭");
        console.log("products: ", products);

        const selectedProduct = products.find(
            (p) => p.id === selectedProductId
        );
        // if (selectedProduct) {
        //     // 장바구니 추가 로직
        //     setCartItems([...updatedCartItems]);
        // }
        console.log("selectedProduct: ", selectedProduct);

        if (selectedProduct) {
            cartEvents.addToCart(
                selectedProduct,
                cartItems,
                setCartItems
                // setLastSelected
            );
        }
    };

    const handleProductChange = (productId: string) => {
        setSelectedProductId(productId);
    };

    return (
        <Container>
            <Wrapper>
                <h2 className="text-2xl font-bold mb-4">장바구니</h2>
                <CartDisplay cartItems={cartItems} />
                <TotalAmount cartItems={cartItems} productList={PRODUCT_LIST} />
                <ProductSelector
                    productList={PRODUCT_LIST}
                    onAddToCart={handleAddToCart}
                    onChange={handleProductChange}
                />
                <ProductStock productList={PRODUCT_LIST} />
            </Wrapper>
        </Container>
    );
};

export default App;
