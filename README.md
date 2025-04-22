# Chapter 2-1. 클린코드와 리팩토링

## 기본과제: 더티코드 개선

이번 과제는 더티코드를 클린코드의 형태로 개선을 하는 과제입니다. 주어진 테스트를 통과하면서 원래 기능과 동일한 동작을 하는 코드를 만들어주세요. basic과제는 제공되는 더티코드를 클린코드와 리팩토링 원칙에 입각해서 더 나은 코드로 만들어보세요. 주어진 테스트를 참고삼아 좋은 이름, 좋은 모양, 좋은 구조를 가지는 코드로 만들어 보세요.

[필수조건]

- Prettier와 ESLint를 설치해서 적용할 것
- 테스트 코드 모두 통과할 것
- = 기존 기능과 동일하게 동작할 것
- = 어플리케이션 요구사항을 모두 만족할 것
    - 상품
        - 상품1 - 10,000원
        - 상품2 - 20,000원
        - 상품3 - 30,000원
    - 상품 관리
        - 상품을 장바구니에 추가할 수 있어야 한다.
        - 장바구니에서 상품을 제거할 수 있어야 한다.
        - 각 상품의 수량을 변경할 수 있어야 한다.
        - 재고가 부족한 상품은 장바구니에 담을 수 없습니다.
    - 가격 계산
        - 장바구니 내 모든 상품의 총액을 계산해야 한다.
        - 개별 상품의 가격과 수량에 따른 소계를 표시해야 한다.
        - 상품1 > 10개 이상 구매 시 10% 할인
        - 상품2 > 10개 이상 구매 시 15% 할인
        - 상품3 > 10개 이상 구매 시 20% 할인
        - 상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
        - 화요일에는 특별할인 10%
        - 임의의 시간마다 깜짝세일 20%, 추천세일 5%
    - 기본 기능
        - 장바구니에 상품 추가 기능
        - 장바구니에서 상품 제거 기능
        - 상품 수량 변경 기능
        - 장바구니 내역 조회 기능
        - 총액 계산 기능

## 심확과제: 유지보수 하기 좋은 코드만들기

심화과제는 **기본과제에서 작성한 코드를 기술고도화를 하는 것입니다.** 바닐라 자바스크립트로 되어 있는 코드를 유지보수하기에 유리한 기술스택(React + Typescript)으로 고도화 리팩토링을 진행해주세요.
우리의 목표는 앞으로 유지보수를 더 잘할 수 있도록 하기 위함입니다. 최소 React와 Typescript를 이용한 코드로 개선해주세요. 그 밖의 기술선택과 폴더/파일 구조, 테스트 코드등은 자유입니다.


## 요청사항

과제를 진행할 떄 AI를 쓰는 것은 자유입니다. 오히려 AI를 활용하는 연습을 해야하는게 시대의 흐름이겠지요.
다만 AI를 쓰더라도 최대한 조금씩 조금씩 이전 코드와 지금 코드를 그대로 유지하면서 리팩토링하는 감각을 기르기 위함이나,
AI에게 최대한 조금씩 그러나 구체적으로 요청하며 한번에 많은 코드를 바꾸지 않도록 하는 연습을 해보세요.

## 과제 체크포인트

### 배포링크

기본 : https://singyukang.github.io/front_5th_chapter2-1/index.basic.html
심화 : https://singyukang.github.io/front_5th_chapter2-1/index.advanced.html

### 기본과제

- [x] 코드가 Prettier를 통해 일관된 포맷팅이 적용되어 있는가?
- [x] 적절한 줄바꿈과 주석을 사용하여 코드의 논리적 단위를 명확히 구분했는가?
- [x] 변수명과 함수명이 그 역할을 명확히 나타내며, 일관된 네이밍 규칙을 따르는가?
- [x] 매직 넘버와 문자열을 의미 있는 상수로 추출했는가?
- [x] 중복 코드를 제거하고 재사용 가능한 형태로 리팩토링했는가?
- [x] 함수가 단일 책임 원칙을 따르며, 한 가지 작업만 수행하는가?
- [ ] 조건문과 반복문이 간결하고 명확한가? 복잡한 조건을 함수로 추출했는가?
- [x] 코드의 배치가 의존성과 실행 흐름에 따라 논리적으로 구성되어 있는가?
- [x] 연관된 코드를 의미 있는 함수나 모듈로 그룹화했는가?
- [x] ES6+ 문법을 활용하여 코드를 더 간결하고 명확하게 작성했는가?
- [ ] 전역 상태와 부수 효과(side effects)를 최소화했는가?
- [x] 에러 처리와 예외 상황을 명확히 고려하고 처리했는가?
- [ ] 코드 자체가 자기 문서화되어 있어, 주석 없이도 의도를 파악할 수 있는가?
- [x] 비즈니스 로직과 UI 로직이 적절히 분리되어 있는가?
- [x] 코드의 각 부분이 테스트 가능하도록 구조화되어 있는가?
- [ ] 성능 개선을 위해 불필요한 연산이나 렌더링을 제거했는가?
- [x] 새로운 기능 추가나 변경이 기존 코드에 미치는 영향을 최소화했는가?
- [x] 코드 리뷰를 통해 다른 개발자들의 피드백을 반영하고 개선했는가?
- [x] (핵심!) 리팩토링 시 기존 기능을 그대로 유지하면서 점진적으로 개선했는가?

### 심화과제

- [x] 변경한 구조와 코드가 기존의 코드보다 가독성이 높고 이해하기 쉬운가?
- [x] 변경한 구조와 코드가 기존의 코드보다 기능을 수정하거나 확장하기에 용이한가?
- [x] 변경한 구조와 코드가 기존의 코드보다 테스트를 하기에 더 용이한가?
- [x] 변경한 구조와 코드가 기존의 모든 기능은 그대로 유지했는가?
- [x] (핵심!) 변경한 구조와 코드를 새로운 한번에 새로만들지 않고 점진적으로 개선했는가?


## 과제 셀프회고

## (1) 처음 코드를 보았을때 나의 행동 + 기능파악

코드를 처음에 딱 맞이한 순간 나의 느낌은.. 어라?.. 이거 `익숙한 맛`이다

이거 우리 회사 코드랑 똑같은거 같은데..? 내가 `평소에 짜던 코드`랑 비슷비슷한거 같기도하고..

어디서 부터 접근을 해야할지 고민이 되는 그런 코드였다.

일단 코드 만으로는 파악이 힘든거같아서 작동을 어떻게 하는지 빌드를 해서 살펴보기로 하였습니다.
<img width="329" alt="스크린샷 2025-04-18 오전 12 57 51" src="https://github.com/user-attachments/assets/d9a3126f-838b-4afc-baef-f0a58a3007b9" />

해당 페이지는 `장바구니에 대한 기능`을 가지고있는 페이지

`총액을 계산해주는 기능과 포인트를 계산해주는 기능`이 있는거같다 

`상품을 고를 수 있는 기능`이 있는것 같고 `상품들을 추가 + 제거`

이를 통해 `총액을 계산해주고 할인된 금액을 적용`해준다.

`Alert를 통해 반짝할인 + 추가할인 이벤트를 담고있는 기능`이 있구나


<img width="332" alt="스크린샷 2025-04-18 오전 12 59 31" src="https://github.com/user-attachments/assets/a89fc08b-ae97-42b0-b553-11b40f86f3d1" />

---

<img width="350" alt="스크린샷 2025-04-18 오전 12 59 58" src="https://github.com/user-attachments/assets/38f026cf-e8ed-43bc-ba9b-17cbaf9930b5" />

위와 같이 어떻게 작동하는지를 보고 아래와 같이 기능별로 분리를 하여 리팩토링을 진행하였습니다.

---

상품 관리 기능
- 상품 추가하기
- 상품 제거하기
- 상품 수량 조절하기

가격 계산 기능
- 총액 계산 (상품 가격 × 수량의 합계)
- 할인 적용 (반짝할인, 추가할인 이벤트)
- 최종 결제 금액 표시
- 포인트 표시

알림 기능
- 반짝할인 이벤트 알림
- 추가할인 이벤트 알림

---


## (2) state와 element 분리 

리팩토링시에 `기능별로 분류` + `상태별 분류`를 진행하면은 **리액트로 변환**을 진행을 했을때 상태와 기능만 그대로 띄어서 붙일수 있겠지? 라는 막연한 생각을 가지고 분리를 시작하였습니다.


제일 처음 시도한 리팩토링은 코드 하단에 있는`이벤트 리스너들을 분리하는 작업`이었습니다. 

`eventManage.js`라는 별도 파일을 만들어 모든 이벤트 관리 로직을 분리하려고 하다보니 이벤트 리스너들이 페이지의 `element`와 `state`에 강한 의존성을 가지고 있는 것을 발견하였습니다.

그래서 저는 페이지에서 사용되는 `모든 상태값`과 `DOM 요소`들을 `객체 형태`로 구현하였습니다

전역적으로 `state` 와 `element` 요소 접근하도록 구현
```javascript
export const state = {
  productList: [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ],
  lastSel: null,
  bonusPts: 0,
  totalAmt: 0,
  itemCnt: 0,
};

export const elements = {
  sel: null,
  addBtn: null,
  cartDisp: null,
  sum: null,
  stockInfo: null,
};
```


## (3) eventManager 분리

이벤트를 관리해주는 곳을 하나로 모으면 좋겠다 싶어 -> eventManager.js 파일로 관리
```javascript
export function attachEventListener() {
  elements.addBtn.addEventListener('click', function () {
    var selItem = elements.sel.value;
    var itemToAdd = state.productList.find(function (p) {
      return p.id === selItem;
    });
    if (itemToAdd && itemToAdd.q > 0) {
      var item = document.getElementById(itemToAdd.id);
      if (item) {
        var newQty =
          parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQty <= itemToAdd.q) {
          item.querySelector('span').textContent =
            itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
          itemToAdd.q--;
        } else {
          alert('재고가 부족합니다.');
        }
      } 
//...
```

## (4) creteUI, buildLayout 분리

main함수에 UI를 `createUI, buildLayout함수`로 뺀후 진행
```javascript
function createUI() {
  const root = document.getElementById('app');
  const cont = document.createElement('div');
  const wrap = document.createElement('div');
  const hTxt = document.createElement('h1');
  elements.cartDisp = document.createElement('div');
  elements.sum = document.createElement('div');
  elements.sel = document.createElement('select');
  elements.addBtn = document.createElement('button');
  elements.stockInfo = document.createElement('div');
  elements.cartDisp.id = 'cart-items';
  elements.sum.id = 'cart-total';
  elements.sel.id = 'product-select';
// ...
}

```
여기서 공통점을 발견 → `element, id, className`을 기준으로 생성 → 이를 공통으로 빼면은 코드 수를 많이 줄이고 가독성을 높일 수 있겠다 판단

```javascript
  elements.sum = document.createElement('div');
  elements.sum.id = 'cart-total';
  elements.sum.className = 'text-xl font-bold my-4';
```

```javascript
function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  return el;
}

export default createEl;

//실제 사용
elements.sum = createEl('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });

```
3줄로 되어있던 `element코드`를 한군데로 모아 관리 
코드를 읽는 사람은 `이 element는 sum`에 관련된 El 이고 `id, className, tag`를 한눈에 보기 편하게 변경

최종적으로 `추가될 UI`를 `buildLayout 함수`를 통해 `container에 append하는 방식`으로 진행하였습니다
```javascript
function buildLayout() {
  const cont = createEl('div', { className: 'bg-gray-100 p-8' });
  const wrap = createEl('div', {
    className:
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8',
  });
  const hTxt = createEl('h1', {
    className: 'text-2xl font-bold mb-4',
    text: '장바구니',
  });

  wrap.append(
    hTxt,
    elements.cartDisp,
    elements.sum,
    elements.sel,
    elements.addBtn,
    elements.stockInfo
  );
  cont.appendChild(wrap);
  return cont;
}
const layout = buildLayout();
root.appendChild(layout);
```

## (5) 유의미한 숫자, 에러 메세지 상수화

과제에 주어진 기능 요구사항을 살펴보면 `가격계산시 할인율`에 대한 정보를 볼 수 있습니다.

```
상품1 > 10개 이상 구매 시 10% 할인
상품2 > 10개 이상 구매 시 15% 할인
상품3 > 10개 이상 구매 시 20% 할인
상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
화요일에는 특별할인 10%
임의의 시간마다 깜짝세일 20%, 추천세일 5%
```

만약에 서비스가 만들어지고 배포까지 완료를 하였는데 `상품1의 할인율을 20프로로 변경`한다고 가정해보자

그러면은 숫자 `10` 을 통해 계산을 하던 `모오오오든 요소들을 변경`을 해주어야한다.

그렇기 때문에 저는 `유의미한 숫자는 상수처리`를 하는게 좋다고 판단이 되어 리팩토링을 진행하였습니다.
```javascript
export const CONSTANTS = {
  FLASH_SALE: {
    DISCOUNT_RATE: 0.8, // 20% 할인
    CHANCE: 0.3, // 30% 확률
    INTERVAL: 30000, // 30초마다 체크
    MAX_DELAY: 10000, // 최대 10초 지연
  },
  FRIDAY_SALE: {
    DISCOUNT_RATE: 0.9,
  },
  SUGGESTION: {
    DISCOUNT_RATE: 0.95, // 5% 할인
    INTERVAL: 60000, // 60초마다 체크
    MAX_DELAY: 20000, // 최대 20초 지연
  },
  DISCOUNT_TABLE: {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  },
  CART: {
    ITEM_DISCOUNT_THRESHOLD: 10,
    BULK_DISCOUNT_ITEM_COUNT: 30,
    BULK_DISCOUNT_RATE: 0.25,
  },
  POINTS: {
    EARNING_UNIT: 1000, // 1000원당 1포인트 적립
  },
  INVENTORY: {
    LOW_STOCK_THRESHOLD: 5, // 5개 미만이면 재고 부족으로 판단
  },
};
```
이를 통해 만약 할인율 변동이나 이벤트 발동 지연 등이 변경이 있어도 `CONSTANTS` 하나만 관리하면 되기 때문에 편하다 라고 느꼈습니다


에러 메세지와 위와 같은 이유로 작성을 하였으며 아래와 같이 `기능별로 구분`하였습니다.
```javascript
const ERROR_MESSAGES = {
  // 세일 시스템 관련 에러
  SALE_SYSTEM: {
    FLASH_SALE_ERROR: '번개 세일 실행 중 오류가 발생했습니다.',
    SUGGESTION_ERROR: '추천 상품 실행 중 오류가 발생했습니다.',
    NO_PRODUCTS: '판매 가능한 상품이 없습니다.',
    PRODUCT_LIST_EMPTY: '상품 목록이 비어있습니다.',
    UPDATE_FAILED: '상품 옵션 업데이트에 실패했습니다.',
  },

  // 상품 관련 에러
  PRODUCT: {
    NO_STOCK: '재고가 부족합니다.',
    INVALID_PRICE: '상품 가격이 유효하지 않습니다.',
    NOT_FOUND: '상품을 찾을 수 없습니다.',
  },

  // 상태 관련 에러
  STATE: {
    NO_LAST_SELECTION: '최근 선택한 상품 정보가 없습니다.',
    INVALID_STATE: '상태 정보가 유효하지 않습니다.',
  },

  // 타이머 관련 에러
  TIMER: {
    INTERVAL_ERROR: '타이머 간격 설정 중 오류가 발생했습니다.',
    TIMEOUT_ERROR: '지연 시간 설정 중 오류가 발생했습니다.',
  },

  // 알림 관련 에러
  ALERT: {
    DISPLAY_ERROR: '알림 표시 중 오류가 발생했습니다.',
  },
};
```


## (6) else지양하기

`1번 코드`
```javascript
      if (tgt.classList.contains('quantity-change')) {
        const qtyChange = parseInt(tgt.dataset.change);
        const newQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
        if (newQuantity > 0 && newQuantity <= prod.count + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
          itemElem.querySelector('span').textContent = itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
          prod.count -= qtyChange;
        } else if (newQuantity <= 0) {
          itemElem.remove();
          prod.count -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (tgt.classList.contains('remove-item')) {
        var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
        prod.count += remQty;
        itemElem.remove();
      }
```

`2번코드`
```javascript
    if (targetElement.classList.contains('quantity-change')) {
      const quantityChange = parseInt(targetElement.dataset.change);
      const spanElem = itemCartContainer.querySelector('span');
      const currentQuantity = parseInt(spanElem.textContent.split('x ')[1]);
      const newQuantity = currentQuantity + quantityChange;

      const productName = spanElem.textContent.split('x ')[0];

      if (newQuantity > product.count + currentQuantity) {
        alert('재고가 부족합니다.');
        return;
      }

      if (newQuantity <= 0) {
        itemCartContainer.remove();
        product.count -= quantityChange;
        return;
      }

      // 정상 수량 변경
      spanElem.textContent = `${productName}x ${newQuantity}`;
      product.count -= quantityChange;
    }
```
`1번코드`와 `2번코드`중에 어떤 코드가 더 눈에 잘 들어오나요?

저는 `2번 코드`를 당연히 고를것이라고 생각이 드는데 그 이유가 무엇인지 저의 생각을 말씀드리면

공통되는 것을 위로 빼는것도 있지만 가장 큰 이유는 `else없이 if만으로 분기를 처리`했기 때문에 라고 생각합니다.

`depth가 1개에서 2개`정도는 파악이 가능하지만 그보다 더한 `else`가 들어가게 되면은 `if이외의 모든 케이스`가 들어가게 되어서 예상하지 못하는 처리를 해줄수 있다는 생각이 있습니다. 

그래서 이번 과제만큼은 `else`를 사용해보지 말자라고 진행을 하였고 `if만으로` 과제를 마칠수 있었습니다.



## (7) 기능 분리 -> 폴더 구조 변경

기능들을 `6개의 함수`로 분리작업 진행
![스크린샷 2025-04-16 오전 10 12 46](https://github.com/user-attachments/assets/62ee6fa9-22c1-42af-83a8-e2a50b01f51f)

```javascript
function main() {
  initializeState();
  createUI();
  updateSelOpts();
  calculateCartItem();
  initializeSaleSystem();
  attachEventListener(calculateCartItem);
}

main();
```

하지만 이게 과연 `UI`랑 `비지니스 로직`이 분리가 되어있는건가..?에 대한 생각이 들었습니다. 

함수로 순서대로 되어있을뿐 명확하게 분리가 되어있다? 라는 느낌은 받지 못하였습니다. 

요구조건에 둘의 분리를 원했기 때문에 `UI서비스단`과 `비지니스서비스단`을 분리를 진행해 보았습니다.


```
project/
├── ui/
│   ├── elements.js
│   ├── layout.js
│   └── render.js
├── services/
│   ├── cart.js
│   ├── products.js
│   └── discount.js

```

`UI`에는 `UI만 담당하는 파일`만
`Service`에는 `비지니스 로직을 담당하는 파일`만 담도록 분리를 진행하였습니다.

![스크린샷 2025-04-16 오후 1 06 23](https://github.com/user-attachments/assets/d316ddd1-ab22-45db-9d1c-bdc144a7888c)



### (8) CreateUI 문제점
`element`를 만들어주는 `createEl 함수`를 처음 만들 때는 `코드량을 크게 줄일 수 있다`는 점에서 `효율적인 방법`이라고 생각했습니다.

하지만 이후 `React로 변환하는 과정`에서는 결국 `모든 UI 요소를 다시 선언적으로 작성`해야 했고, 이로 인해 불필요한 중복 작업이 발생했습니다. 

이 경험을 통해 `createEl 방식은 선언형 UI와는 거리가 있으며`, 확장성과 재사용성 면에서도 한계가 있다는 것을 느꼈습니다.

```javascript
function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.value) el.value = options.value;
  return el;
}

export default createEl;

export function createUI() {
  //element 생성
  const root = document.getElementById('app');
  elements.CartContainer = createEl('div', { id: 'cart-items', className: '' });
  elements.CartSummary = createEl('div', { id: 'cart-total', className: 'text-xl font-bold my-4' });
  elements.ProductSelect = createEl('select', { id: 'product-select', className: 'border rounded p-2 mr-2' });
  elements.AddToCartButton = createEl('button', { id: 'add-to-cart', className: 'bg-blue-500 text-white px-4 py-2 rounded', text: '추가' });
  elements.StockInfoText = createEl('div', { id: 'stock-status', className: 'text-sm text-gray-500 mt-2' });

  //Layout 생성
  const layout = buildLayout();
  root.appendChild(layout);
}

```

이를 통해서 `createEl`을 통해 `DOM 요소를 생성하는 방식이 아닌` 1주차에 진행하였던 `JSX 스타일을 흉내내는 방식`으로 진행을 하면은 리팩토링에 편할것 이다 라고 느꼈습니다.

```javascript
function CartUI() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items" />
        <div id="cart-total" className="text-xl font-bold my-4" />
        <select id="product-select" className="border rounded p-2 mr-2" />
        <button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        <div id="stock-status" className="text-sm text-gray-500 mt-2" />
      </div>
    </div>
  );
}
```

###  (9) state 분리
기본과제에는 다음과 같은 하나의 상태 객체를 통해 상태를 관리하였습니다. 

하나의 객체를 통해서 관리를 하면은 추가 제거도 편할것이고 무엇보다 한눈에 모든 상태를 파악이 가능할거같아 다음과 같이 정의하였습니다.
```javascript
export const state = {
  productList: [],
  selected: null,
  currentBonusPoints: 0,
  currentTotalAmount: 0,
  currentItemCount: 0,
};

const [appState, setAppState] = useState({
  productList: [
    { id: 'p1', name: '상품1', price: 10000, count: 50 },
    { id: 'p2', name: '상품2', price: 20000, count: 30 },
  ],
  selected: null,
  currentBonusPoints: 0,
  currentTotalAmount: 0,
  currentItemCount: 0,
});


<CartItem appState={appState} setAppState={setAppState} />
<CartTotalInfo appState={appState} setAppState={setAppState} />
<ProductSelect appState={appState} />
```

`React로 리팩토링`을 진행하면서,  `appState`를 컴포넌트에 넘겨주려다보니 `하나의 state로 모든 컴포넌트가 의존성`을 가지고 있음을 발견하였습니다. 

`productList`는 상품의 상태를 나타내지만 나머지 상태는 장바구니의 관련도니 상태를 나타내고 있습니다 → 하나의 객체에 섞여있으니 로직의 흐름을 파악하는데 어려움을 겪음

이를 위해 상태를 `관심사별`로 나누기 시작

`productList` → `상품 목록 관리`

`selectedId`, `currentBonusPoints`, `currentTotalAmount`, `currentItemCount` 등 → `장바구니 상태 관리`

처음엔 단일 상태가 직관적이고 단순해 보였지만, **애플리케이션이 점점 복잡해질수록 관심사 분리를 통한 상태 관리가 훨씬 효과적**이라는 것을 깨달았다.


### (10) 테스트 코드를 추가 작성하지 않았을떄 예상하지못한 오류 발생
```javascript
  if (bulkDiscountAmt > itemDiscountAmt) {
    return {
      finalAmount: subTotal * 1 - CONSTANTS.CART.BULK_DISCOUNT_RATE,
      discountRate: CONSTANTS.CART.BULK_DISCOUNT_RATE,
    };
  }
```
상품의 갯수가 `30개가 이상이 들어갔는데 할인이 적용이 안되는 오류` 발견

이때 저는 테스트 코드상으로는 문제가 없어서 당황했었습니다.

```javascript
subTotal * 1 - CONSTANTS.CART.BULK_DISCOUNT_RATE
```

코드를 살펴보니 할인 계산 처리해줄때 `괄호없이 계산하여 잘못된 계산값 도출`하였고

30개 이상 구매하였을때 테스트 코드를 통해 확인

```javascript
    it('상품을 30개 이상 집으면은 25% 할인이 들어가야한다.', () => {
      const state = {
        currentItemCount: 35,
      };

      const subTotal = 100000;
      const totalAmount = 100000;

      function applyBulkDiscountFixed(subTotal, totalAmount) {
        if (state.currentItemCount < CONSTANTS.CART.BULK_DISCOUNT_ITEM_COUNT)
          return {
            finalAmount: totalAmount,
            discountRate: (subTotal - totalAmount) / subTotal,
          };

        const bulkDiscountAmt = subTotal * CONSTANTS.CART.BULK_DISCOUNT_RATE;
        const itemDiscountAmt = subTotal - totalAmount;

        if (bulkDiscountAmt > itemDiscountAmt) {
          return {
            finalAmount: subTotal * (1 - CONSTANTS.CART.BULK_DISCOUNT_RATE), 
            discountRate: CONSTANTS.CART.BULK_DISCOUNT_RATE,
          };
        }
        return {
          finalAmount: totalAmount,
          discountRate: itemDiscountAmt / subTotal,
        };
      }

      const result = applyBulkDiscountFixed(subTotal, totalAmount);
      const expectedAmount = subTotal * (1 - CONSTANTS.CART.BULK_DISCOUNT_RATE); 

      expect(result.finalAmount).toEqual(expectedAmount);
    });
```
![스크린샷 2025-04-18 오전 10 56 18](https://github.com/user-attachments/assets/74fa17df-5caa-4f6b-b941-d4df060cbfeb)

이를 통해 처음 설계를 할때 `발생 가능한 경우의 수를 테스트코드에 추가` 해놓는 것이 중요하구나 라고 느꼈습니다.



### (11) 원본코드 상품 개수 추가 오류

https://github.com/user-attachments/assets/1671019c-4486-46b3-b124-e426f7b44531

팀원분이 원본코드에서도 버그가 있다고 말씀해주셔서 이를 확인해보았습니다.

영상을 확인해보면 `상품2`  `추가`를 눌렀을때 분명히 재고가 남아있는데 추가가 안되는 오류를 확인할 수 있습니다.

```javascript
if(item) {
  var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
  if(newQty <= itemToAdd.q) {
    item.querySelector('span').textContent = itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
    itemToAdd.q--;
  } else {alert('재고가 부족합니다.');}
}
```
원본 코드에서 `if문` 을 살펴보면은 `새 수량이 현재 재고보다 작거나 같은지` 를 확인하지만

`장바구니에 있는 상품의 수량` 과 `남은 재고` 를 비교해야 제가 원하는 작동이라고 생각하였습니다.

작동순서를 살펴보면

상품5의 같은경우에는 `10개의 수량`을 가지고있습니다. 
그러면은 처음 추가 버튼을 누르면은 `newQty은 2`,  `itemToAdd.q은 9`를 가지게 됩니다. 
다음 버튼을 누르게되면은 `newQty은 3,  itemToAdd.q은 8`, ... `newQty가 6, itemToAdd가 5` 가 되는 시점에(장바구니에는 5개가 담겨있음) `if문을 타게되면서` 아직 상품수량이 남아있음에도 추가 버튼이 작동안하는 잘못된 결과를 가져옵니다.

이를 `React 변환시`에 `장바구니에 있는 상품의 수량과 남은 재고를 비교`하도록 변경

```javascript
const handleAddToCart = () => {
  if (!cart.selectedId) return;

  const product = products.find((p) => p.id === cart.selectedId);
  if (!product || product.quantity <= 0) {
    alert('재고가 부족합니다.');
    return;
  }

  addToCart(product);
  updateProductQuantity(product.id, -1);
};

const handleQuantityChange = (productId: string, change: number) => {
  const product = products.find((p) => p.id === productId);

  if (change > 0 && (!product || product.quantity <= 0)) {
    alert('재고가 부족합니다.');
    return;
  }

  updateCartItemQuantity(productId, change);
  updateProductQuantity(productId, -change);
};
```



### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?

`컴포넌트 분리`와 `관심사 분리` 그리고 `기능실행` 나누는 것을 가장 신경썼습니다.

### 컴포넌트
각 `컴포넌트의 역할을 중심`으로 분리를 시도하였습니다.

이 장바구니를 덮는 `Container`
상단 부분을 나타내는 `Header`
`Cart내부`를 담는 `Container`, `CartItem`
총 금액을 보여주는 `CartTotalInfo`
상품을 고를수 있는 컴포넌트 `ProductSelect`
추가 버튼을 담당하는 `CartAddButton`
재고의 상태를 보여주는 `StockStatus`
로 나누었습니다.

```javascript
    <CartConatiner>
      <CartHeader />
      <CartItemContainer>
        {cart.cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            handleQuantityChange={handleQuantityChange}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </CartItemContainer>
      <CartTotalInfo
        totalAmount={cart.currentTotalAmount}
        discountRate={cart.discountRate}
        bonusPoints={cart.currentBonusPoints}
      />
      <ProductSelect
        products={products}
        selectedId={cart.selectedId}
        onSelect={handleProductSelect}
      />
      <CartAddButton onClick={handleAddToCart} />
      <StockStatus products={products} />
    </CartConatiner>
```


### 관심사 분리
`useProduct`,  `useCart` 

저는 처음에 `service단` 에 `cart` 에 대한 정보를 처리해주는것, `discount` 에 대한 정보를 처리해주는 것으로 진행하였습니다.

상태 분리가 되어있지않아 `1개의 상태`에 모든것이 다 엮여 있는 형태

`React변환시에 cart기능`에 있는 것과, `discount에 있는 상태`를 분리하는것이 가장 오려걸렸던 작업

`cart에 있는 상태`와 그에 맞는 로직들, `product에 있는 상태`와 `그와 맞는 로직들을 중심`으로 `Hook을 만들어 구현`을 하였습니다.


### 기능실행

```javascript
  const handleProductSelect = (productId: string) => {
    setSelectedId(productId);
  };

  const handleAddToCart = () => {
    if (!cart.selectedId) return;

    const product = products.find((p) => p.id === cart.selectedId);
    if (!product || product.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    addToCart(product);
    updateProductQuantity(product.id, -1);
  };

  const handleRemoveFromCart = (productId: string) => {
    const cartItem = cart.cartItems.find((item) => item.id === productId);
    if (cartItem) {
      updateProductQuantity(productId, cartItem.quantity);
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = products.find((p) => p.id === productId);

    if (change > 0 && (!product || product.quantity <= 0)) {
      alert('재고가 부족합니다.');
      return;
    }

    updateCartItemQuantity(productId, change);
    updateProductQuantity(productId, -change);
  };

```
`useCart`, `useProduct`에서 `생성한 기능`들을 

`handle`을 통해 `의미를 갖는 행동`으로 묶은후 `컴포넌트에 전달`하려고 하였습니다.



### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?

현재 추가 버튼을 누르면은 장바구니 내부만 렌더링 되는것이아닌 컨테이너 전체가 렌더링, 상품을 선택할때도 전체가 렌더링, + - 버튼 삭제 버튼 클릭시 전체 렌더링 등
성능 최적화에 대해서는 시간이 부족해 진행해볼수 없었는데 다시 하면은 기능구현을 빠르게 마친후 성능을 개선하고 싶습니다.

https://github.com/user-attachments/assets/8c681000-91eb-4f8f-bf20-3e1b58b76bfa




### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)

Hook을 통해 관심사를 product, cart 두 단계로 나누었는데 이것이 맞는 방향인건지 궁금합니다!

제가 접근한 방향이 맞는지 궁금합니다! 전체적인 기능을 파악한뒤 상태 + 기능 을 나누어서 묶은다음 handle을 통해 컴포넌트 전달

```
리팩토링 과정을 보면서 어떤 의식의 흐름이 있었는지 흥미롭게 봤습니다. :)
정말 좋아요. 이런 내 개발 과정의 기록과 복기는 단순히 개발하는 것보다 훨씬 더 많은 통찰과 기술적인 향상을 준다고 생각합니다.
데이터를 다루는 로직들을 cart와 product 훅으로 나누는 것은, 네, 좋은 것 같아요.
카트와 프로덕트를 구분하는 것을 기본으로 과제를 수행하시는 분들마다 다른 접근을 하고 있어요. :)
나중에 테오 코치님 솔루션을 보시고 아시겠지만, 비슷하지만 조금 다른 접근이에요 (좀 더 순수 함수의 비중을 높였죠).
뭐가 옳다기보다는 아, 이렇게도 하는구나, 이렇게 하면 테스트가 쉽겠구나 등등을 느끼실 수 있었으면 좋을 것 같습니다. :)
```

