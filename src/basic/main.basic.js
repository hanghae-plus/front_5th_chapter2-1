import renderUI from './views/renderUI';

import calculateCart from './feature/calculateCart';
import updateSelectOptions from './feature/updateSelectOptions';
import setPromotionTimer from './feature/setPromotionTimer';
import handleAddToCart from './event/handleAddToCart';
import handleCartItemClick from './event/handleCartItemClick';

import { domRefs } from './store/state';

function main() {
    renderUI();
    updateSelectOptions();
    calculateCart();
    setPromotionTimer();

    domRefs.addToCartButton.addEventListener('click', handleAddToCart);
    domRefs.cartItemsContainer.addEventListener('click', handleCartItemClick);
}

main();
