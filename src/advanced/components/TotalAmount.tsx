import React from "react";
import { cartService } from "../services/cartService";
import { CartItem, Product } from "../types";

interface TotalAmountProps {
    cartItems: CartItem[];
    productList: Product[];
}

const TotalAmount = ({ cartItems, productList }: TotalAmountProps) => {
    // 여기서.. calcCart계산 결과를 넣어주여야 된다 .
    const calculation = cartService.calculateCart(cartItems, productList);

    // 얘는 일단 놔둬놓고..
    // if (caculation.discountRate > 0) {
    //     const discountRateSpan = document.createElement("span");
    //     discountRateSpan.className = "text-green-500 ml-2";
    //     discountRateSpan.textContent =
    //         "(" + (caculation.discountRate * 100).toFixed(1) + "% 할인 적용)";
    //     totalAmountEl.appendChild(discountRateSpan);
    // }

    return (
        <div id="cart-total" className="text-xl font-bold my-4">
            총액: {Math.round(calculation.totalAmount)}원
            {calculation.hasDiscount && (
                <span className="text-green-500 ml-2">
                    ({calculation.discountPercentage.toFixed(1)}% 할인 적용)
                </span>
            )}
            <span id="loyalty-points" className="text-blue-500 ml-2">
                (포인트: {calculation.points})
            </span>
        </div>
    );
};

export default TotalAmount;
