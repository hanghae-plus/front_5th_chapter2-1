import { useEffect, useState } from "react";
import { Product } from "../types";
import { STOCK } from "../constants";

interface StockInfoProps {
    products: Product[];
};

const StockInfo = ({products}: StockInfoProps) => {
    const [stockStatusMessage, setStockStatusMessage] = useState<string>('');

    function getStockMessage() {
        let message = '';

        products.forEach(item => {
            if (item.quantity < STOCK.LOW_THRESHOLD) {
                message += `${item.name}: ${
                    item.quantity > 0 
                        ? `재고 부족 (${item.quantity}개 남음)` 
                        : '품절'
                }\n`;
            }
        });

        return message;
    }

    useEffect(() => {
        setStockStatusMessage(getStockMessage());
    }, [products]);

    if (!stockStatusMessage) return null;

    return (
        <div id="stock-status" className="text-sm text-gray-500 mt-2 whitespace-pre-lineÏ">
            {stockStatusMessage}
        </div>
    )
}

export default StockInfo;