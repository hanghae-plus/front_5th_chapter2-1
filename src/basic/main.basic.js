import { Cart } from './components/Cart';
import { Products } from './components/Products';
import { productStore, cartStore } from './stores';
import { registerGlobalEvents } from './@lib/eventManager';
import { addDiscountEvents } from './services/addDiscountEvents';

export const App = (root) => {
  const cartComponent = Cart();
  const productsComponent = Products();

  // 기본 템플릿 등록
  const template = /* html */ `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        ${cartComponent.template}
        ${productsComponent.template}
      </div>
    </div>
  `;

  root.innerHTML = template;

  // 컴포넌트 초기화
  productsComponent.init();
  cartComponent.init();

  // 이벤트 등록
  addDiscountEvents().init();
  registerGlobalEvents();

  // 구독 설정: 데이터가 변경될 때마다 관련 UI 업데이트
  productStore.subscribe(() => {
    productsComponent.render();
  });

  cartStore.subscribe(() => {
    cartComponent.render();
  });
};

// App 실행
App(document.getElementById('app'));
