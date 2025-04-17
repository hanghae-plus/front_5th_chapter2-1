import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';
import { SelectedProductStore } from '../store';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';
import { addItemToCart } from '../logic';

export const handleAddButtonClick = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const productSelect = ProductSelectDOM.get();

  const selectedProductId = productSelect.value;
  const itemToAdd = PRODUCT_LIST.find(
    (product) => product.id === selectedProductId,
  );

  addItemToCart(itemToAdd, cartItemsContainer);
  calculateCart();
  SelectedProductStore.set('selectedProduct', selectedProductId);
};
