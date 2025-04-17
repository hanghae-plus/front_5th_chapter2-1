import React, { useState, useEffect } from "react";
import { PRODUCT_LIST } from "./data/productData";
import Container from "./components/Container";
import Wrapper from "./components/Wrapper";
// import "./App.css";

// 필요한 타입 가져오기 (예: 기존 데이터를 TypeScript로 변환한 경우)
// import { Product } from './types';
// import { productList } from './data/productData';

const App: React.FC = () => {
    console.log(PRODUCT_LIST);

    return (
        <Container>
            <Wrapper></Wrapper>
        </Container>
    );
};

export default App;
