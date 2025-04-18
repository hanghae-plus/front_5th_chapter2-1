import React, { useEffect } from 'react';
import { minute, randomNumber, thirtySecond } from '../utils';
import { useProduct } from '../provider/ProductProvider';
import { useCart } from '../provider/CartProvider';

function Sale() {
  const { products } = useProduct();
  const { selectedItemId } = useCart();

  const flashSale = () => {
    const discountRate = 0.8;
    const saleRate = 0.3;
    const emptyQuantity = 0;

    const flashSaleItem = products[Math.floor(randomNumber * products.length)];

    const isSale =
      randomNumber < saleRate && flashSaleItem.quantity > emptyQuantity;

    if (isSale) {
      const saledPrice = Math.round(flashSaleItem.price * discountRate);
      flashSaleItem.price = saledPrice;

      alert(`번개세일! ${flashSaleItem.name}이(가) 20% 할인 중입니다!`);
    }
  };

  const recommendSale = () => {
    const discountRate = 0.95;
    const emptyQuantity = 0;

    if (selectedItemId) {
      const recommendSaleProduct = products.find((product) => {
        return (
          product.id !== selectedItemId && product.quantity > emptyQuantity
        );
      });

      if (recommendSaleProduct) {
        alert(
          `${recommendSaleProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`,
        );

        const saledPrice = Math.round(
          recommendSaleProduct.price * discountRate,
        );
        recommendSaleProduct.price = saledPrice;
      }
    }
  };

  useEffect(() => {
    const flashSaleInterval = setInterval(() => {
      flashSale();
    }, thirtySecond);

    return () => clearInterval(flashSaleInterval);
  }, [flashSale]);

  useEffect(() => {
    const recommendSaleInterval = setInterval(() => {
      recommendSale();
    }, minute);

    return () => clearInterval(recommendSaleInterval);
  }, [recommendSale]);

  return null;
}

export default React.memo(Sale);
