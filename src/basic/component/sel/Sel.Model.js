// prettier-ignore
const ProductModel = (function () {
  // 상품 목록
  const listItems = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];
  // 상품별 할인율
  const DISCOUNT_RATES = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };
  // 최근 선택한 상품
  let lastSelectedItem;

  // 상품 목록 Getter
  function getList() {
    return listItems.map((l) => ({ ...l }));
  }
  // 상품 Getter
  function findList(id) {
    return listItems.find((l) => l.id === id);
  }
  // 상품 수량 Setter
  function increaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item) {
      item.quantity += amount;
      return true;
    }
    return false;
  }
  function decreaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item && item.quantity >= amount) {
      item.quantity -= amount;
      return true;
    }
    return false;
  }
  // 최근 선택한 상품 Setter
  function setLastSelectedItem(item) {
    lastSelectedItem = item;
  }
  function getLastSelectedItem() { return lastSelectedItem; }

  return {
    DISCOUNT_RATES,
    getList,
    findList,
    increaseQuantity,
    decreaseQuantity,
    getLastSelectedItem,
    setLastSelectedItem,
  };
}) ();

export default ProductModel;
