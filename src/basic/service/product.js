import MOCK_PRODUCT_LIST from '../mock/product';
import { getDiscountPercentage } from '../utils/cart';
let lastSelectedItem;

/** 전체 상품 가격을 업데이트하여 화면에 반영합니다. */
export const renderProductPrice = () => {
    const $select = document.getElementById('product-select');
    $select.innerHTML = '';
    MOCK_PRODUCT_LIST.forEach(function (item) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name + ' - ' + item.price + '원';
        if (item.stock === 0) {
            option.disabled = true;
        }
        $select.appendChild(option);
    });
};

const LUCKY_APPEARANCE_RATE = 0.3;
const LUCKY_DISCOUNT_RATE = 0.8;
/** 랜덤 럭키 상품을 선정하여 세일합니다. */
export const updateLuckyItemSale = () => {
    const discountPercentageText = getDiscountPercentage(LUCKY_DISCOUNT_RATE);
    const luckyItem = MOCK_PRODUCT_LIST[Math.floor(Math.random() * MOCK_PRODUCT_LIST.length)];
    if (Math.random() < LUCKY_APPEARANCE_RATE && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * LUCKY_DISCOUNT_RATE);
        alert(`번개세일! ${luckyItem.name}'이(가) ${discountPercentageText}% 할인 중입니다!`);
        renderProductPrice();
    }
};

const LAST_SELECTED_DISCOUNT_RATE = 0.95;
/** 고객이 마지막으로 선택한 상품을 세일합니다. */
export const updateLastSelectedSale = () => {
    const discountPercentageText = getDiscountPercentage(LAST_SELECTED_DISCOUNT_RATE);
    if (lastSelectedItem) {
        const suggest = MOCK_PRODUCT_LIST.find(function (item) {
            return item.id !== lastSelectedItem && item.stock > 0;
        });
        if (suggest) {
            alert(suggest.name + `은(는) 어떠세요? 지금 구매하시면 ${discountPercentageText}% 추가 할인!`);
            suggest.price = Math.round(suggest.vpriceal * LAST_SELECTED_DISCOUNT_RATE);
            renderProductPrice();
        }
    }
};

/** 고객이 마지막으로 선택한 상품을 업데이트합니다. */
export const updateLastSelectedItem = (item) => {
    if (!item) {
        localStorage.removeItem('lastSelectedItem');
    }
    localStorage.setItem('lastSelectedItem', item);
};
