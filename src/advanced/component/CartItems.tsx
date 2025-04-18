import { MouseEvent } from "react";
import CartItem from "./CartItem";
import { useProducts } from "../hooks/useProducts";

export const CartItems = () => {
    const {products, updateQuantity, resetQuantity} = useProducts()

    const handleClickQtyChangeBtn = (event: MouseEvent<HTMLButtonElement>) => {
        const { target } = event;
        if (target instanceof HTMLElement) {
            const classList = target.classList;
            if (classList.contains("quantity-change")) {
                const changeQty = parseInt(target.dataset.change || "0"); // 1 | -1
                const prodId = target.dataset.productId as string;
                updateQuantity(prodId, changeQty)
            } else if (classList.contains("remove-item")) {
                const prodId = target.dataset.productId as string;
                resetQuantity(prodId)
            }
        }
    };

    return (
        <div id="cart-items">
            {products.map((prod) => {
                if (prod.cart <= 0) return;
                return CartItem(prod, handleClickQtyChangeBtn);
            })}
        </div>
    )
}