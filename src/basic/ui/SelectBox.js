import { ProductStore } from '../store/productState';

// 상품 선택 컴포넌트
const selectBox = () => {
  // 요소 생성
  const selectEle = document.createElement('select');
  selectEle.id = 'product-select';
  selectEle.className = 'border rounded p-2 mr-2';

  //  재고에따른 옵션 업데이트 함수
  const updateOptions = () => {
    selectEle.innerHTML = '';

    const allProducts = ProductStore.getAllProducts();

    allProducts.forEach((item) => {
      let opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name + ' - ' + item.price + '원';

      if (!ProductStore.hasEnoughStock(item.id)) {
        opt.disabled = true;
      }

      selectEle.appendChild(opt);
    });
  };

  // 렌더링 함수
  const render = (targetEl) => {
    targetEl.appendChild(selectEle);
    updateOptions(); // 초기 옵션 설정
  };

  return {
    element: selectEle,
    updateOptions,
    render,
  };
};

export { selectBox };
