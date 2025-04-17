import { state } from '../store/state';

export default function setPromotionTimer() {
    setTimeout(() => {
        setInterval(() => {
            const { productList } = state;
            const luckyItem = productList[Math.floor(Math.random() * productList.length)];

            if (Math.random() < 0.3 && luckyItem.q > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert(`번개세일! ${luckyItem.name} 이(가) 20% 할인 중입니다!`);
                updateSelectOptions();
            }
        }, 30000);
    }, Math.random() * 10000);

    setTimeout(() => {
        setInterval(() => {
            const { productList, lastSelectedProductId } = state;

            if (lastSelectedProductId) {
                const suggestion = productList.find((item) => item.id !== lastSelectedProductId && item.q > 0);

                if (suggestion) {
                    suggestion.val = Math.round(suggestion.val * 0.95);
                    alert(`${suggestion.name} 은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
                    updateSelectOptions();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}
