import { CartItemType } from "../types";
import { discountRates } from "../constants";

type Props = {
    cartList: CartItemType[];
}

const CartTotal = ({ cartList }: Props) => {
    // console.log('cartList:', cartList);

    const calcTotal = () => {
        let subTotal = 0; // 할인 전 총액
        let discountTotal = 0; // 총 할인 금액

        cartList.forEach((item) => {
            const itemTotal = item.price * item.count; // 상품별 총액
            const itemDiscount = itemTotal * (discountRates[item.id] || 0); // 상품별 할인 금액

            subTotal += itemTotal;
            discountTotal += itemDiscount;
        });

        const totalAfterDiscount = subTotal - discountTotal; // 할인 후 총액
        const discountRate = subTotal > 0 ? (discountTotal / subTotal) * 100 : 0; // 할인율 계산

        return { subTotal, totalAfterDiscount, discountTotal, discountRate };
    };

    const calcBonusPts = () => {
        return totalAfterDiscount / 1000;
    }

    const {  subTotal, totalAfterDiscount, discountTotal, discountRate } = calcTotal();

    return (
        <div style={{ display:'flex', flexDirection:'row', gap: 10, }} id="cart-total" className="text-xl font-bold my-4">
            <div>
            총액: {totalAfterDiscount} 원
            </div>
            <div style={{ color:'lightgreen' }}>
              {discountRate.toFixed(2)} % 할인적용
            </div>
            <div style={{ color: 'skyblue' }}>
             포인트: {calcBonusPts()} 원
            </div>
            
        </div>
    );
};

export default CartTotal;