import { Product } from '../types/product';
import {
  calculateProductDiscount,
  calculateCartDiscount,
  calculateTuesdayDiscount,
} from '../utils/calculateDiscount';

interface CartTotalProps {
  cartItems: Product[];
  products: Product[];
}

const CartTotal = ({ cartItems, products }: CartTotalProps) => {
  const calculateTotal = () => {
    let totalPrice = 0;
    let totalProductCount = 0;
    let totalPriceBeforeDiscount = 0;

    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.id);

      if (!product) {
        return;
      }

      totalProductCount += item.quantity;

      const productTotalPrice = product.price * item.quantity;

      totalPriceBeforeDiscount += productTotalPrice;
      totalPrice += calculateProductDiscount(product, item.quantity);
    });

    let totalCartDiscountRate = calculateCartDiscount(
      totalPrice,
      totalPriceBeforeDiscount,
      totalProductCount,
    );

    const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);

    totalPrice = tuesdayDiscount.price;
    totalCartDiscountRate = tuesdayDiscount.discountRate;

    const bonusPoints = Math.floor(totalPrice / 1000);

    return {
      totalPrice,
      discountRate: totalCartDiscountRate,
      bonusPoints,
    };
  };

  const { totalPrice, discountRate, bonusPoints } = calculateTotal();

  return (
    <div className="text-xl font-bold my-4">
      총액: {Math.round(totalPrice).toLocaleString()}원
      {discountRate > 0 && (
        <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
      )}
      <span className="text-blue-500 ml-2">(포인트: {bonusPoints})</span>
    </div>
  );
};

export default CartTotal;
