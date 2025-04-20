import React from 'react';
import { useState } from 'react';

const MOCK_PRODUCT_LIST = [
    { id: 'p1', name: '상품1', price: 10000, stock: 50 },
    { id: 'p2', name: '상품2', price: 20000, stock: 30 },
    { id: 'p3', name: '상품3', price: 30000, stock: 20 },
    { id: 'p4', name: '상품4', price: 15000, stock: 0 },
    { id: 'p5', name: '상품5', price: 25000, stock: 10 },
];

const ProductSection = () => {
    const [selectedItem, setSelectedItem] = useState(MOCK_PRODUCT_LIST[0].id);

    return (
        <>
            <select className="border rounded p-2 mr-2" onChange={(e) => setSelectedItem(e.target.value)}>
                {MOCK_PRODUCT_LIST.map((product) => (
                    <option key={product.id} value={product.id} disabled={product.stock === 0}>
                        {product.name} - {product.price}원
                    </option>
                ))}
            </select>
            <button
                id="advance-add-to-cart"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => console.log(selectedItem)}
            >
                추가
            </button>
        </>
    );
};

export default ProductSection;
