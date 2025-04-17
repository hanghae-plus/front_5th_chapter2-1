import { timeOutSale } from './basic/module/timeOutSale';
import { useCart } from './basic/module/useCart';
import { cartAddBtn } from './basic/ui/CartAddBtn';
import { cartItem } from './basic/ui/CartItem';
import { cartResult } from './basic/ui/CartResult';
import { container } from './basic/ui/Container';
import { selectBox } from './basic/ui/SelectBox';
import { stockInfo } from './basic/ui/StockInfo';

function MainComponent() {
  const root = document.getElementById('app');

  // 훅 초기화
  const cart = useCart();

  // 컨테이너 생성 - 완료
  const containerC = container();
  containerC.render(root);

  // 장바구니 컴포넌트 생성
  const cartItemC = cartItem();
  cartItemC.render(containerC.wrapperEl);
  const $cartItem = cartItemC.element;

  // 장바구니 금액 합계 컴포넌트 생성
  const cartResultC = cartResult();
  cartResultC.render(containerC.wrapperEl);

  // 상품 선택 컴포넌트 생성
  const selectBoxC = selectBox();
  selectBoxC.render(containerC.wrapperEl);
  const $selectBox = selectBoxC.element;

  // 장바구니 추가 버튼 컴포넌트 생성
  const cartAddBtnC = cartAddBtn();
  cartAddBtnC.render(containerC.wrapperEl);

  // 재고 정보 컴포넌트 생성
  const stockInfoC = stockInfo();
  stockInfoC.render(containerC.wrapperEl);

  // 장바구니 클릭 이벤트 핸들러 등록
  $cartItem.addEventListener('click', (event) => {
    cart.handleCartItemChange(event, $cartItem);
    cart.calculateCart($cartItem, cartResultC, stockInfoC, selectBoxC);
  });

  // 장바구니 추가 버튼 클릭 이벤트 핸들러 등록
  cartAddBtnC.setupEventHandler(() => {
    cart.addToCart($selectBox, $cartItem);
    cart.setLastSelected($selectBox.value);
    cart.calculateCart($cartItem, cartResultC, stockInfoC, selectBoxC);
  });

  // 초기 계산
  cart.calculateCart($cartItem, cartResultC, stockInfoC);

  // 타이머 시작
  timeOutSale();
}

MainComponent();
