import React, { useState, useEffect } from "react";
import { PRODUCT_LIST } from "./data/productData";

// import "./App.css";

// 필요한 타입 가져오기 (예: 기존 데이터를 TypeScript로 변환한 경우)
// import { Product } from './types';
// import { productList } from './data/productData';

const App: React.FC = () => {
    console.log(PRODUCT_LIST);

    return (
        <div className="bg-gray-100 p-8">
            <header className="App-header">
                <h1>Vite + React + TypeScript</h1>
                <p>기존 프로젝트와 통합된 React 앱</p>
            </header>
            <main>{/* 컴포넌트 내용 */}</main>
        </div>
    );
};

export default App;
