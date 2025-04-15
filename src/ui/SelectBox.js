import { PRODUCT_LIST } from "../store/PRODUCT";

// 상품 선택 컴포넌트
const selectBox = () => {
  // 요소 생성
  const selectEle = document.createElement("select");
  selectEle.id = "product-select";
  selectEle.className = "border rounded p-2 mr-2";

  // 옵션 업데이트 함수
  const updateOptions = () => {
    selectEle.innerHTML = "";
    PRODUCT_LIST.forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name + " - " + item.val + "원";
      if (item.q === 0) opt.disabled = true;
      selectEle.appendChild(opt); // sel -> selectEle로 변경
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
