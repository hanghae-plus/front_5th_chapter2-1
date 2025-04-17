import { products } from '../../data/products';
import { updateSelectOptions } from './services/updateSelectOptions';
import { calculateCart } from './services/calculateCart';
import { applyLightningSale, suggestProduct } from './services';
import { setupIntervalWithDelay } from '../../utils';
import { OutOfStockList, ProductSelector, TotalAmount, CartItemList } from './components';

// 장바구니 페이지
export const CartPage = (
  { root },
  lightningSaleInterval = 30000,
  suggestProductInterval = 60000,
  lightningSaleDelay = Math.random() * 10000,
  suggestProductDelay = Math.random() * 20000
) => {
  // 마지막으로 선택한 상품과 다른 상품을 추천하기 위한 값
  // 습관: 선택한 변수에는 과거형을 쓴다. ex) checked
  let lastSelectedItem;
  // 장바구니의 총 금액에 따라 적립되는 포인트
  const bonusPoints = 0;

  const Layout = () => {
    return `
      <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 class="text-2xl font-bold mb-4">장바구니</h1>
          
          <!-- 장바구니 아이템들이 들어갈 컨테이너 -->
          ${CartItemList({ products })}
  
          <!-- 총액 표시 -->
          ${TotalAmount({ totalPrice: 0, discountRate: 0, bonusPoints: 0 })}
  
          <!-- 상품 선택 및 추가 영역 -->
          ${ProductSelector({ products })}
  
          <!-- 재고 상태 표시 -->
          ${OutOfStockList({ products })}
  
        </div>
      </div>
    `;
  };

  // 레이아웃 DOM요소 추가
  root.innerHTML = Layout();

  const select = document.getElementById('product-select');
  const addCartButton = document.getElementById('add-to-cart');
  const cartContainerElement = document.getElementById('cart-items');

  calculateCart({ products, cartContainerElement, bonusPoints });

  setupEventListeners();

  setupIntervalWithDelay(
    applyLightningSale(products, select, updateSelectOptions),
    lightningSaleInterval,
    lightningSaleDelay
  );

  setupIntervalWithDelay(
    suggestProduct(products, lastSelectedItem, select, updateSelectOptions),
    suggestProductInterval,
    suggestProductDelay
  );

  function setupEventListeners() {
    addCartButton.addEventListener('click', () => {
      const selectedItem = select.value;

      const itemToAdd = products.find((product) => product.id === selectedItem);

      if (itemToAdd && itemToAdd.stock > 0) {
        const item = document.getElementById(itemToAdd.id);

        if (item) {
          const newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

          if (newQuantity <= itemToAdd.stock) {
            item.querySelector('span').textContent =
              itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQuantity;
            itemToAdd.stock--;
          } else {
            alert('재고가 부족합니다.');
          }
        } else {
          const newItem = document.createElement('div');
          newItem.id = itemToAdd.id;
          newItem.className = 'flex justify-between items-center mb-2';
          newItem.innerHTML =
            '<span>' +
            itemToAdd.name +
            ' - ' +
            itemToAdd.price +
            '원 x 1</span><div>' +
            '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
            itemToAdd.id +
            '" data-change="-1">-</button>' +
            '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
            itemToAdd.id +
            '" data-change="1">+</button>' +
            '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
            itemToAdd.id +
            '">삭제</button></div>';
          cartContainerElement.appendChild(newItem);
          itemToAdd.stock--;
        }
        calculateCart({ products, cartContainerElement, bonusPoints });
        lastSelectedItem = selectedItem;
      }
    });

    cartContainerElement.addEventListener('click', (event) => {
      const target = event.target;

      if (
        target.classList.contains('quantity-change') ||
        target.classList.contains('remove-item')
      ) {
        const productId = target.dataset.productId;
        const productElement = document.getElementById(productId);
        const product = products.find((item) => item.id === productId);

        if (target.classList.contains('quantity-change')) {
          const quantityChange = parseInt(target.dataset.change);
          const newQuantity =
            parseInt(productElement.querySelector('span').textContent.split('x ')[1]) +
            quantityChange;

          if (
            newQuantity > 0 &&
            newQuantity <=
              product.stock +
                parseInt(productElement.querySelector('span').textContent.split('x ')[1])
          ) {
            productElement.querySelector('span').textContent =
              productElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
            product.stock -= quantityChange;
          } else if (newQuantity <= 0) {
            productElement.remove();
            product.stock -= quantityChange;
          } else {
            alert('재고가 부족합니다.');
          }
        } else if (target.classList.contains('remove-item')) {
          const removedQuantity = parseInt(
            productElement.querySelector('span').textContent.split('x ')[1]
          );
          product.stock += removedQuantity;
          productElement.remove();
        }
        calculateCart({ products, cartContainerElement, bonusPoints });
      }
    });
  }
};
