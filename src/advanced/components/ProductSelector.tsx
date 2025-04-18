import React, { useEffect } from "react";

import { Product } from "../types";
import Button from "./Button";

interface ProductSelectorProps {
    productList: Product[];
    onChange?: (productId: string) => void;
    onAddToCart: () => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
    productList,
    onChange,
    onAddToCart,
}) => {
    return (
        <>
            <select
                id="product-select"
                className="border rounded p-2 mr-2"
                onChange={(e) => onChange && onChange(e.target.value)} // 여기서 App.tsx의 handleProductChange 호출
            >
                {productList.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}
                        disabled={item.q === 0}
                    >
                        {item.name} - {item.val}원
                    </option>
                ))}
            </select>
            <Button
                onClick={onAddToCart}
                variant="primary"
                size="large"
                children="추가"
                productId={""} // 그냥 추가 버튼은 Id값이 필요가 없음
                dataChange={"-1"}
            />
        </>
    );
};

export default ProductSelector;
