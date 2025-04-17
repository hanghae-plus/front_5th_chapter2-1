import { renderProductList } from "../../components/product";
import { productStore } from "../../stores/product";
import { uiStore } from "../../stores/ui";

/**
 * ID를 기준으로 상품을 찾습니다.
 *
 * @param {string} id - 찾을 상품의 ID
 * @returns {Product|undefined} 찾은 상품 또는 undefined
 */
export const getProductById = (id) => {
  const { productList } = productStore.state;

  return productList.find((item) => item.id === id);
};

/**
 * 상품의 재고를 감소시킵니다.
 *
 * @param {string} productId - 재고를 감소시킬 상품의 ID
 * @param {number} amount - 감소시킬 수량
 * @returns {Product[]} 업데이트된 상품 목록
 */
export const decreaseProductStock = (productId, amount) => {
  const { productList } = productStore.state;

  return productList.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        quantity: Math.max(0, product.quantity - amount),
      };
    }

    return product;
  });
};

/**
 * 상품의 재고를 증가시킵니다.
 *
 * @param {string} productId - 재고를 증가시킬 상품의 ID
 * @param {number} amount - 증가시킬 수량
 * @returns {Product[]} 업데이트된 상품 목록
 */
export const increaseProductStock = (productId, amount) => {
  const { productList } = productStore.state;

  return productList.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        quantity: product.quantity + amount,
      };
    }

    return product;
  });
};

/**
 * 상품의 가격을 업데이트합니다.
 *
 * @param {string} productId - 가격을 업데이트할 상품의 ID
 * @param {number} price - 새 가격
 * @returns {Product[]} 업데이트된 상품 목록
 */
export const updateProductPriceById = (productId, price) => {
  const { productList } = productStore.state;

  return productList.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        price,
      };
    }

    return product;
  });
};

/**
 * 번개 세일 기능을 초기화합니다.
 * 랜덤 시간 후 시작되며, 일정 시간마다 랜덤 상품의 할인을 적용합니다.
 */
export const initializeFlashSale = () => {
  setTimeout(() => {
    setInterval(() => {
      const { productList } = productStore.state;
      const randomProduct = productList[Math.floor(Math.random() * productList.length)];

      if (Math.random() < 0.3 && randomProduct.quantity > 0) {
        // 가격 20% 할인
        const discountedPrice = Math.round(randomProduct.price * 0.8);
        const updatedProductList = updateProductPriceById(randomProduct.id, discountedPrice);

        productStore.setProductList(updatedProductList);

        // 알림
        alert(`번개세일! ${randomProduct.name}이(가) 20% 할인 중입니다!`);

        // 상품 목록 업데이트
        const productSelect = document.getElementById("product-select");
        if (productSelect) {
          renderProductList(productSelect);
        }
      }
    }, 30000); // 30초마다
  }, Math.random() * 10000); // 0-10초 사이에 시작
};

/**
 * 현재 선택된 상품과 다른 재고가 있는 상품을 찾습니다.
 *
 * @param {Product[]} productList - 상품 목록
 * @param {string} currentProductId - 현재 선택된 상품 ID
 * @returns {Product|undefined} 추천 상품 또는 undefined
 */
const findAlternativeProduct = (productList, currentProductId) => {
  return productList.find((item) => item.id !== currentProductId && item.quantity > 0);
};

/**
 * 상품 선택 드롭다운 요소를 업데이트합니다.
 */
const updateProductSelectElement = () => {
  const productSelect = document.getElementById("product-select");
  if (productSelect) {
    renderProductList(productSelect);
  }
};

/**
 * 상품 추천 기능을 초기화합니다.
 * 일정 시간마다 마지막으로 선택한 상품을 기반으로 다른 상품을 추천합니다.
 */
export const initializeRecommendation = () => {
  setTimeout(() => {
    setInterval(() => {
      const lastSelectedId = uiStore.state.lastSelectedProduct;

      if (lastSelectedId) {
        const { productList } = productStore.state;
        const suggestedProduct = findAlternativeProduct(productList, lastSelectedId);

        if (suggestedProduct) {
          // 알림
          alert(`${suggestedProduct.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);

          // 가격 5% 할인
          const discountedPrice = Math.round(suggestedProduct.price * 0.95);
          const updatedProductList = updateProductPriceById(suggestedProduct.id, discountedPrice);

          productStore.setProductList(updatedProductList);

          // 상품 목록 업데이트
          updateProductSelectElement();
        }
      }
    }, 60000); // 60초마다
  }, Math.random() * 20000); // 0-20초 사이에 시작
};
