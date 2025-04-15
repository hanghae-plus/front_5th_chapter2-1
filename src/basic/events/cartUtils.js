import ITEMS from '../constants/items';

const isSelectedCartAvailable = (_$) => {
  return _$.classList.contains('quantity-change') || _$.classList.contains('remove-item');
};

const getSelecteItem = (selectedId) => {
  return ITEMS.find((i) => {
    return i.id === selectedId;
  });
};

const isQuantityChange = (_$) => {
  return _$.classList.contains('quantity-change');
};

const isRemoveButton = (_$) => {
  return _$.classList.contains('remove-item');
};

const updateQuanity = ($selectedCart, $item, item) => {
  const quantityChange = parseInt($selectedCart.dataset.change);

  //아이템 정보 추출
  const $itemSpan = $item.querySelector('span');
  const itemText = $itemSpan.textContent;
  const [itemInfo, currentQuantityText] = itemText.split('x ');
  const currentQuantity = parseInt(currentQuantityText);
  const newQuantity = currentQuantity + quantityChange;

  // 재고 확인
  const maxAllowedQuantity = item.stock + currentQuantity;

  if (newQuantity <= 0) {
    $item.remove();
    item.stock += currentQuantity;
  }
  if (newQuantity <= maxAllowedQuantity) {
    // 재고가 충분하면 수량 업데이트
    $itemSpan.textContent = `${itemInfo}x ${newQuantity}`;
    item.stock = maxAllowedQuantity - newQuantity;
  }
  alert('재고가 부족합니다.');
};

const removeQuanity = ($item, item) => {
  let quantityStack = parseInt($item.querySelector('span').textContent.split('x ')[1]);
  item.stock += quantityStack;
  $item.remove();
};

export {
  isSelectedCartAvailable,
  getSelecteItem,
  isQuantityChange,
  isRemoveButton,
  updateQuanity,
  removeQuanity,
};
