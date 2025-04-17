import React from "react";
import { CartItem as CartItemType } from "../types";
import Button from "./Button";

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    function handleRemoveButton() {}
    function handleAddButton() {}
    function handleDeleteButton() {}
    console.log("item: ", item);

    return (
        <div id="item.id" className="flex justify-between items-center mb-2">
            <span className="flex-grow">
                {item.product.name} - {item.product.val}원 x {item.quantity}
            </span>
            <div>
                <Button
                    variant="secondary"
                    size="small"
                    onClick={handleRemoveButton}
                    children="-"
                    productId={item.id}
                    dataChange={"-1"}
                />
                <Button
                    variant="secondary"
                    size="small"
                    onClick={handleAddButton}
                    children="+"
                    productId={item.id}
                    dataChange={"1"}
                />
                <Button
                    variant="danger"
                    size="medium"
                    onClick={handleDeleteButton}
                    children="삭제"
                    productId={item.id}
                    dataChange={""}
                />
            </div>
        </div>
    );
};

export default CartItem;
