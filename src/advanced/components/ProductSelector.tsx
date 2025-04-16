import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';

type Props = {
    productList: Product[];
    setProductList: (products: Product[]) => void;
    lastSelectedProduct: Product | null;
    setLastSelectedProduct: (product: Product | null) => void;
    bonusPoints: number;
    setBonusPoints: (points: number) => void;
    cartItems: CartItem[];
    onCartChange: (cart: CartItem[]) => void;
};

const ProductSelector = ({
    productList,
    setProductList,
    lastSelectedProduct,
    setLastSelectedProduct,
    bonusPoints,
    setBonusPoints,
    cartItems,
    onCartChange,
}: Props) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (productList.length > 0) {
            const firstAvailableProduct = productList.find(p => p.stock > 0) || null;
            setSelectedId(firstAvailableProduct ? firstAvailableProduct.id : null);
            setLastSelectedProduct(firstAvailableProduct);
        }
    }, [productList]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedId(id);
        const selected = productList.find(p => p.id === id) || null;
        setLastSelectedProduct(selected);
    }

    const handleAddToCart = () => {
        if (selectedId === null) return;

        const product = productList.find(p => p.id === selectedId);
        if (!product || product.stock <= 0) {
            alert('상품이 품절되었습니다.');
            return;
        }

        // 재고 감소
        const updatedProducts = productList.map(p =>
            p.id === product.id && p.stock > 0
                ? { ...p, stock: p.stock - 1 }
                : p
        );
        setProductList(updatedProducts);

        // 장바구니 수량 관리
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        let updatedCart: CartItem[] = [];

        if (existingItemIndex !== -1) {
            // 수량만 +1
            updatedCart = cartItems.map((item, idx) =>
                idx === existingItemIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // 새로 추가
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }

        onCartChange(updatedCart);
    };


    return (
        <div className="flex items-center gap-4 my-6">
            <select
                className="border rounded p-2 mr-2"
                onChange={handleSelectChange}
                value={selectedId ?? ''}
            >
                {productList?.map(product => (
                    <option key={product.id} value={product.id} disabled={product.stock === 0}>
                        {product.name} - {product.price}원
                    </option>
                ))}
            </select>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={selectedId === null}
                onClick={handleAddToCart}
            >
                장바구니에 추가
            </button>
        </div>
    );
}




export default ProductSelector;
