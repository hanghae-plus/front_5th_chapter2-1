import { messages } from "../messages/messages";

export const saleTimer = (productList, lastSelectedProduct, updateSelectOptions) => {

    // 번개 세일(랜덤 상품 20프로 할인)
    // 30초마다 랜덤 상품을 찾아서 20% 할인 적용
    // 재고가 있는 상품 중에서 랜덤으로 선택
    let lightningSaleTimer;
    const getRandomProduct = () => {
        const availableProducts = productList.filter(product => product.quantity > 0);
        return availableProducts[Math.floor(Math.random() * availableProducts.length)];
    }

    const startLightningSale = () => {
        lightningSaleTimer = setInterval(() => {
            const lightningSale = getRandomProduct();
            if (lightningSale) {
                lightningSale.val = Math.round(lightningSale.val * 0.8); // 20% 할인
                alert(messages.SALE_ALERT(lightningSale.name));
                updateSelectOptions();
            }
        }, 30000); // 30초마다 번개 세일 상품을 찾음

    }

    // 추천 상품(마지막 선택 상품 기준 다른 상품 5% 할인)
    // 60초마다 추천 상품을 보여줌
    // 마지막 선택 상품과 다른 상품 중 재고가 있는 상품을 찾음
    let recommendationTimer;
    const startRecommendSale = () => {
        recommendationTimer = setInterval(() => {
            if (lastSelectedProduct) {
                const recommendSale = productList.find(item => item.id !== lastSelectedProduct && item.quantity > 0);
                if (recommendSale) {
                    recommendSale.val = Math.round(recommendSale.val * 0.95); // 5% 할인
                    alert(messages.SUGGESTION(recommendSale.name));
                    updateSelectOptions();
                }
            }
        }, 60000); // 60초마다 추천 상품을 찾음
    }


    const start = () => {
        setTimeout(startLightningSale, Math.random() * 10000); // 랜덤 대기 후 번개 세일 시작       
        setTimeout(startRecommendSale, Math.random() * 20000); // 랜덤 대기 후 추천 상품 시작
    }

    // const stop = () => {
    //     clearInterval(lightningSaleTimer);
    //     clearInterval(recommendationTimer);
    // }

    return { start };
}