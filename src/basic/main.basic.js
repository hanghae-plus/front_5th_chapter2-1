import { CartStore, SelectedProductStore } from './store/stores';
import { PRODUCT_LIST } from './consts/productList';
import {
  AddButtonDOM,
  CartItemsContainerDOM,
  LayoutDOM,
  ProductSelectDOM,
  StockStatusContainerDOM,
  TotalAmountContainerDOM,
} from './ui';

const discountTable = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

const main = () => {
  ProductSelectDOM.init();
  TotalAmountContainerDOM.init();
  StockStatusContainerDOM.init();

  const productSelect = ProductSelectDOM.get();
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const stockStatusContainer = StockStatusContainerDOM.get();

  LayoutDOM.init();

  const { mainAppRoot, mainContainer, mainWrapper, mainHeader } =
    LayoutDOM.get();

  CartItemsContainerDOM.init();

  const cartItemsContainer = CartItemsContainerDOM.get();

  AddButtonDOM.init();

  const addButton = AddButtonDOM.get();

  updateProductSelectOptions(productSelect);

  mainWrapper.appendChild(mainHeader);
  mainWrapper.appendChild(cartItemsContainer);
  mainWrapper.appendChild(totalAmountContainer);
  mainWrapper.appendChild(productSelect);
  mainWrapper.appendChild(addButton);
  mainWrapper.appendChild(stockStatusContainer);
  mainContainer.appendChild(mainWrapper);
  mainAppRoot.appendChild(mainContainer);

  calculateCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem =
        PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateProductSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      const lastSelectedProductId = SelectedProductStore.get('selectedProduct');

      if (lastSelectedProductId) {
        const suggest = PRODUCT_LIST.find(
          (item) => item.id !== lastSelectedProductId && item.quantity > 0,
        );

        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );
          suggest.value = Math.round(suggest.value * 0.95);
          updateProductSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const updateProductSelectOptions = () => {
  const productSelect = ProductSelectDOM.get();
  const newSelectOptions = PRODUCT_LIST.reduce((newOptions, item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} - ${item.value}원`;
    if (item.quantity === 0) option.disabled = true;
    newOptions.appendChild(option);
    return newOptions;
  }, document.createDocumentFragment());

  productSelect.replaceChildren(newSelectOptions);
};

const getDiscountRate = (subTotal) => {
  const { itemCount, totalAmount } = CartStore.get();
  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemDiscount) {
      CartStore.set('totalAmount', subTotal * (1 - 0.25));
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    CartStore.set('totalAmount', CartStore.get('totalAmount') * 1 - 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
};

export const calculateCart = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const totalAmountContainer = TotalAmountContainerDOM.get();

  const cartItems = [...cartItemsContainer.children];

  const { itemCount, subTotal, totalAmount } = cartItems.reduce(
    (acc, item) => {
      const currentItem = PRODUCT_LIST.find(
        (product) => product.id === item.id,
      );
      if (!currentItem) return acc;

      const quantity = parseInt(
        item.querySelector('span').textContent.split('x ')[1],
      );

      const itemTotal = currentItem.value * quantity;
      const discount =
        quantity >= 10 ? (discountTable[currentItem.id] ?? 0) : 0;

      acc.itemCount += quantity;
      acc.subTotal += itemTotal;
      acc.totalAmount += itemTotal * (1 - discount);

      return acc;
    },
    {
      itemCount: 0,
      subTotal: 0,
      totalAmount: 0,
    },
  );

  CartStore.set('itemCount', itemCount);
  CartStore.set('subTotal', subTotal);
  CartStore.set('totalAmount', totalAmount);

  totalAmountContainer.textContent =
    '총액: ' + Math.round(CartStore.get('totalAmount')) + '원';

  const discountRate = getDiscountRate(CartStore.get('subTotal'));

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    totalAmountContainer.appendChild(span);
  }

  updateStockStatus();
  renderBonusPoints();
};

const renderBonusPoints = () => {
  const totalAmountContainer = TotalAmountContainerDOM.get();
  const bonusPoints = Math.floor(CartStore.get('totalAmount') / 1000);

  const bonusPointsTag =
    document.getElementById('loyalty-points')
    ?? (() => {
      const el = document.createElement('span');
      el.id = 'loyalty-points';
      el.className = 'text-blue-500 ml-2';
      totalAmountContainer.appendChild(el);
      return el;
    })();

  bonusPointsTag.textContent = `(포인트: ${bonusPoints})`;
};

const updateStockStatus = () => {
  const stockStatusContainer = StockStatusContainerDOM.get();

  const infoMessage = PRODUCT_LIST.reduce((acc, item) => {
    if (item.quantity < 5) {
      const status =
        item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
      return `${acc}${item.name}: ${status}\n`;
    }
    return acc;
  }, '');

  stockStatusContainer.textContent = infoMessage;
};

main();
