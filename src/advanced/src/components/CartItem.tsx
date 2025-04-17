import React from 'react';
import { CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
    onQuantityChange: (productId: string, change: number) => void;
    onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = React.memo(({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="flex justify-between items-center mb-2">
            <span>
                {item.product.name} - {item.product.price.toLocaleString()}원 x {item.quantity}
            </span>
            <div>
                <button
                    onClick={() => onQuantityChange(item.product.id, -1)}
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                >
                    -
                </button>
                <button
                    onClick={() => onQuantityChange(item.product.id, 1)}
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                >
                    +
                </button>
                <button
                    onClick={() => onRemove(item.product.id)}
                    className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                >
                    삭제
                </button>
            </div>
        </div>
    );
});
