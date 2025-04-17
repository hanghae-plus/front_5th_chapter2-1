import React, { useState, useEffect } from "react";
import { PRODUCT_LIST } from "./data/productData";
import Container from "./components/Container";
import Wrapper from "./components/Wrapper";
import CartDisplay from "./components/CartDisplay";
import TotalAmount from "./components/TotalAmount";
import ProductSelector from "./components/ProductSelector";
import ProductStock from "./components/ProductStock";

// import "./App.css";

// 필요한 타입 가져오기 (예: 기존 데이터를 TypeScript로 변환한 경우)
// import { Product } from './types';
// import { productList } from './data/productData';

const App: React.FC = () => {
    console.log(PRODUCT_LIST);

    return (
        <Container>
            <Wrapper>
                <h2 className="text-2xl font-bold mb-4">장바구니</h2>
                <CartDisplay />
                <TotalAmount />
                <ProductSelector productList={PRODUCT_LIST} />
                <ProductStock productList={PRODUCT_LIST} />
            </Wrapper>
        </Container>
    );
};

export default App;
