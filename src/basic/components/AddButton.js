import { PRODUCT_SELECT_ID, ADD_TO_CART_ID } from '../constants';

const AddButton = {
  init: (productService, cartService, promotionService) => {
    const select = document.querySelector(`#${PRODUCT_SELECT_ID}`);
    const button = document.querySelector(`#${ADD_TO_CART_ID}`);

    const { getProductById } = productService;
    const { addCartItem } = cartService;
    const { updateLastSelectedProductId } = promotionService;

    button.addEventListener('click', () => {
      const productId = select.value;
      const product = getProductById(productId);

      if (!product || product.quantity <= 0) {
        return;
      }

      addCartItem(productId);
      updateLastSelectedProductId(productId);
    });
  },

  render: () => {
    return `
      <button id="${ADD_TO_CART_ID}" class="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    `;
  },
};

export default AddButton;
