import { minute, tenSecond, thirtySecond, twentySecond, randomNumber } from '.';
import { selectProduct } from '../components';
import { productStore, cartStore } from '../store';

// 번개세일
export function flashSale() {
  const discountRate = 0.8;
  const saleRate = 0.3;
  const emptyQuantity = 0;

  setTimeout(() => {
    setInterval(() => {
      const products = productStore.getProducts();
      const flashSaleItem =
        products[Math.floor(randomNumber * products.length)];

      const isSale =
        randomNumber < saleRate && flashSaleItem.quantity > emptyQuantity;

      if (isSale) {
        const saledPrice = Math.round(flashSaleItem.price * discountRate);
        flashSaleItem.price = saledPrice;

        alert(`번개세일! ${flashSaleItem.name}이(가) 20% 할인 중입니다!`);

        selectProduct.updateOptionElement();
      }
    }, thirtySecond);
  }, randomNumber * tenSecond);
}

// 추천 세일
export function recommendSale() {
  const emptyQuantity = 0;
  const discountRate = 0.95;

  setTimeout(() => {
    setInterval(() => {
      const products = productStore.getProducts();
      const selectedProduct = cartStore.getSelectedProduct();

      if (selectedProduct) {
        const recommendSaleProduct = products.find((product) => {
          return (
            product.id !== selectedProduct && product.quantity > emptyQuantity
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

          selectedProduct.updateOptionElement();
        }
      }
    }, minute);
  }, randomNumber * twentySecond);
}

// 세일 초기화(interval로 반복 수행)
export function saleInit() {
  flashSale();
  recommendSale();
}
