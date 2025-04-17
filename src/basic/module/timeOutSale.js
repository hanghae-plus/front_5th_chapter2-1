import { ProductStore } from '../store/productState';

const timeOutSale = (selectBoxC) => {
  // 번개세일 - 랜덤 상품 20% 할인
  setTimeout(function () {
    setInterval(function () {
      const allProducts = ProductStore.getAllProducts();
      const availableProducts = allProducts.filter((product) => ProductStore.hasEnoughStock(product.id));

      // 상품이 있고 30% 확률로 세일 발동
      if (availableProducts.length > 0 && Math.random() < 0.3) {
        const luckyItem = availableProducts[Math.floor(Math.random() * availableProducts.length)];
        const newPrice = Math.round(luckyItem.price * 0.8);
        ProductStore.updatePrice(luckyItem.id, newPrice);

        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

        // 셀렉트박스 옵션 업데이트
        if (selectBoxC) {
          selectBoxC.updateOptions();
        }
      }
    }, 30000);
  }, Math.random() * 10000);

  // 추천 상품 - 현재 선택 상품 외의 다른 상품 5% 할인
  setTimeout(function () {
    setInterval(function () {
      const lastSelected = ProductStore.getLastSelected();

      if (lastSelected) {
        const allProducts = ProductStore.getAllProducts();
        const suggestProducts = allProducts.filter(
          (product) => product.id !== lastSelected && ProductStore.hasEnoughStock(product.id)
        );

        if (suggestProducts.length > 0) {
          const suggest = suggestProducts[Math.floor(Math.random() * suggestProducts.length)];
          const newPrice = Math.round(suggest.price * 0.95);
          ProductStore.updatePrice(suggest.id, newPrice);

          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');

          if (selectBoxC) {
            selectBoxC.updateOptions();
          }
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

export { timeOutSale };
