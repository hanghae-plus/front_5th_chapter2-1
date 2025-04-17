import { products } from './const';
import { calculateCart, handleCartAdd, handleCartItemClick } from './logic';
import { renderInit, updateSelectOptions } from './render';

function main() {
    let root = document.getElementById('app');
    renderInit(root);
    updateSelectOptions(products);
    calculateCart(products);

    // 버튼 이벤트 추가
    const $addButton = document.getElementById('add-to-cart');
    $addButton.addEventListener('click', handleCartAdd);

    const $cartDisplay = document.getElementById('cart-items');
    $cartDisplay.addEventListener('click', handleCartItemClick);

    // 랜덤 딜레이 이벤트 발생 함수
    const scheduleRandomEvent = (eventHandler, interval, randomDelay) => {
        const delay = Math.random() * randomDelay;
        setTimeout(() => {
            setInterval(eventHandler, interval);
        }, delay);
    };

    // 번개 세일 함수
    const applyFlashSale = () => {
        let luckyItem = products[Math.floor(Math.random() * products.length)];
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
            luckyItem.price = Math.round(luckyItem.price * 0.8);
            alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
            updateSelectOptions();
        }
    };

    // 추천 상품 세일 함수
    const applyRecommendationSale = () => {
        if (lastSelectedProductId) {
            let suggest = products.find(function (item) {
                return item.id !== lastSelectedProductId && item.quantity > 0;
            });
            if (suggest) {
                alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                suggest.price = Math.round(suggest.price * 0.95);
                updateSelectOptions();
            }
        }
    };

    // 번개 세일 이벤트 스케줄링
    scheduleRandomEvent(applyFlashSale, 30000, 10000);
    // 추천 상품 세일 이벤트 스케줄링
    scheduleRandomEvent(applyRecommendationSale, 60000, 20000);
}

// 메인 함수 실행
main();
