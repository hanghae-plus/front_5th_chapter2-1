import React from "react";

import { Product } from "../types";
import Button from "./Button";

interface ProductSelectorProps {
    productList: Product[];
    onChange?: (productId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
    productList,
    onChange,
}) => {
    console.log("productList: ", productList);

    const handleAddButton = () => {};

    return (
        <>
            <select
                id="product-select"
                className="border rounded p-2 mr-2"
                onChange={(e) => onChange && onChange(e.target.value)}
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
                onClick={handleAddButton}
                variant="primary"
                size="large"
                children="추가"
            />
        </>
    );
};

export default ProductSelector;
