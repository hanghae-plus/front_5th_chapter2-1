import { PRODUCT_ITEM } from '../store/PRODUCT';

// 상품 선택 컴포넌트
const selectBox = () => {
  // 요소 생성
  const selectEle = document.createElement('select');
  selectEle.id = 'product-select';
  selectEle.className = 'border rounded p-2 mr-2';

  // 옵션 업데이트 함수
  const updateOptions = () => {
    selectEle.innerHTML = '';
    PRODUCT_ITEM.forEach(function (item) {
      var opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = item.name + ' - ' + item.price + '원';
      if (item.stock === 0) opt.disabled = true;
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
