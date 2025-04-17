import React from "react";
import { Product } from "../types";

interface ProductListProps {
    productList: Product[];
    onChange?: (productId: string) => void;
}

const ProductStock = ({ productList }: ProductListProps) => {
    const lowStockProducts = productList.filter((item) => item.q < 5);
    console.log("lowStockProducts: ", lowStockProducts);

    return (
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
            {lowStockProducts.length > 0 ? (
                lowStockProducts.map((item) => (
                    <p key={item.id}>
                        {item.name}:{" "}
                        {item.q > 0 ? `재고부족 (${item.q}개 남음)` : "품절"}
                    </p>
                ))
            ) : (
                <p>모든 상품의 재고가 충분합니다.</p>
            )}
        </div>
    );
};

export default ProductStock;
