import { useEffect } from 'react';
import { ProductListType } from '../hooks/useProductManagement';

interface UseTimeOutSaleProps {
  productList: ProductListType[];
  setProductList: React.Dispatch<React.SetStateAction<ProductListType[]>>;
  lastSelected: string | null;
  setLastSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

const useTimeOutSale = ({ ...props }: UseTimeOutSaleProps) => {
  const { lastSelected, productList, setLastSelected, setProductList } = props;

  useEffect(() => {
    const lightningDelay = Math.random() * 10000;

    // 번개세일 - 10초 후 시작
    const lightningTimeout = setTimeout(() => {
      const lightningInterval = setInterval(() => {
        const availableProducts = productList.filter((product) => product.stock > 0);

        // 상품이 있고 30% 확률로 세일 발동
        if (availableProducts.length > 0 && Math.random() < 0.3) {
          const luckyItemIndex = Math.floor(Math.random() * availableProducts.length);
          const luckyItem = availableProducts[luckyItemIndex];

          // 상품 가격 업데이트 (20% 할인)
          setProductList((prevList) =>
            prevList.map((product) =>
              product.id === luckyItem.id
                ? { ...product, price: Math.round(product.price * 0.8) }
                : product
            )
          );

          // 알림 표시
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
      }, 30000);

      return () => clearInterval(lightningInterval);
    }, lightningDelay);

    // 추천 상품 - 현재 선택 상품 외의 다른 상품 5% 할인
    const recommendDelay = Math.random() * 20000;
    const recommendTimeout = setTimeout(() => {
      const recommendInterval = setInterval(() => {
        if (lastSelected) {
          const suggestProducts = productList.filter(
            (product) => product.id !== lastSelected && product.stock > 0
          );

          if (suggestProducts.length > 0) {
            const suggestIndex = Math.floor(Math.random() * suggestProducts.length);
            const suggest = suggestProducts[suggestIndex];

            // 상품 가격 업데이트 (5% 할인)
            setProductList((prevList) =>
              prevList.map((product) =>
                product.id === suggest.id
                  ? { ...product, price: Math.round(product.price * 0.95) }
                  : product
              )
            );

            // 알림 표시
            alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          }
        }
      }, 60000);

      return () => clearInterval(recommendInterval);
    }, recommendDelay);

    // cleanup 함수에서 타임아웃 정리
    return () => {
      clearTimeout(lightningTimeout);
      clearTimeout(recommendTimeout);
    };
  }, [productList, setProductList, lastSelected, setLastSelected]);
};

export default useTimeOutSale;
