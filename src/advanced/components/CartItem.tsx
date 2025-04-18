import React from "react";
import { CartItem as CartItemType } from "../types";
import Button from "./Button";

interface CartItemProps {
    item: CartItemType;
    handleQuantityChange: (id: string, change: number) => void;
    handleRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    handleQuantityChange,
    handleRemoveItem,
}) => {
    return (
        <div id="item.id" className="flex justify-between items-center mb-2">
            <span className="flex-grow">
                {item.product.name} - {item.product.val}원 x {item.quantity}
            </span>
            <div>
                <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    children="-"
                    productId={item.id}
                    dataChange={"-1"}
                />
                <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    children="+"
                    productId={item.id}
                    dataChange={"1"}
                />
                <Button
                    variant="danger"
                    size="medium"
                    onClick={() => handleRemoveItem(item.id)}
                    children="삭제"
                    productId={item.id}
                    dataChange={""}
                />
            </div>
        </div>
    );
};

export default CartItem;
