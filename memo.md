> vanilla js 기반의 프로젝트에서, prettier와 eslint 설정을 하고 싶은데, 설정을 어떻게 넣어줘야할까?

- eslint-config-prettier eslint-plugin-prettier는 무조건 설치해야되는걸까?
- plugin과 config의 차이란?
- plugin: 새로운 기능이나 룰 추가
- config: 설정된 룰 세트를 가져와서 곧바로 적용

> prettier 설정

- https://prettier.io/docs/options
- 기본 옵션

```
experimentalTernaries << 삼항연산자 개행 처리
experimentalOperatorPosition << 연산자 위치를 앞으로
printWidth << 줄바꿈 기준 문자 수
tabWidth << 탭 문자 수
useTabs << 탭 문자 사용 여부
semi << 세미콜론 사용 여부
singleQuote << 따옴표 사용 여부
quoteProps << 객체 키 따옴표 사용 여부
jsxSingleQuote << jsx 따옴표 사용 여부
trailingComma << 후행 쉼표 사용 여부
bracketSpacing << 객체 리터럴 중괄호 내 공백 사용 여부
objectWrap << 객체 중괄호 내 줄바꿈 처리 여부
bracketSameLine << 객체 리터럴 중괄호 내 줄바꿈 처리 여부
arrowParens << 화살표 함수 매개변수 괄호 사용 여부
rangeEnd << 범위 끝 위치
rangeStart << 범위 시작 위치
parser << 파서 선택(파일 경로에서 자동으로 파서를 추론하므로 이 설정을 변경할 필요가 없음)
filepath << 파일 경로
requirePragma << 파일 상단에 @prettier 주석 사용 여부
insertPragma << Prettier가 파일을 포맷할 때, 상단에 @prettier 주석을 자동으로 삽입
proseWrap << 마크다운 문법 줄바꿈 처리 여부
htmlWhitespaceSensitivity << HTML 공백 민감도 설정
vueIndentScriptAndStyle << Vue 파일에서 script와 style 태그의 들여쓰기 여부
endOfLine << 줄바꿈 문자 처리 방식(운영체제에 따라 줄바꿈 문자가 다르기 때문에 설정)
embeddedLanguageFormatting << 내장 언어 서식화 여부
singleAttributePerLine << 단일 속성 줄바꿈 여부
```

> eslint 설정

- 우선 `eslint --init` 명령어로 설정 파일을 생성

```js
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
```

- eslint.config.js 파일 수정
- eslint와 prettier를 연동하기 위함

```js
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    plugins: { js, prettier: prettierPlugin },
    rules: {
      ...prettierPlugin.configs.recommended.rules, // Prettier를 ESLint 룰로 인식
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {},
  },
  tseslint.configs.recommended,
  prettierConfig, // eslint-config-prettier로 포맷팅 충돌 제거
]);
```

- rules에 Prettier 적용
- Prettier config 마지막에 확장

## 과제 시작

- 흠... 보니까 일단 main()이 실행 -> createElement로 요소 생성 -> 각 요소 추가 -> 추가로 addEventListener 동작

- 일단 꼴뵈기 싫은 var 부터 다 처리해버리자
- 그리고 좀... 개행처리 및 변수랑 함수들 위치 조정
- 일단 이정도만 해도 흐름이 보이긴 하네
- 그렇다면 이제 네이밍을 건드려볼까

- 일단 데이터랑 UI랑 이름이 중복되지 않기 위해, 감싸는 데이터 요소 + Container 이런식으로 네이밍 변경
- 근데 바꾸려고 정확한 동작을 확인하는데, 원래 코드가 제대로 안돌아가는거 같은데...?
- select가 안바뀐다?

- function 대신 arrow function으로 변경
- function형은 this를 사용하기 위함. 즉 클래스나 객체 메서드, 생성자 혹은 이벤트 핸들러에서 사용
- 하지만 현재 그렇게 사용하는 부분이 없음. 특히 이벤트 핸들러에서도 this를 사용하지 않기 때문에 화살표 함수 사용 가능

- innerHTML을 ``로 수정해줬는데, prettier 적용이 안되네. prettier 설정 변경 필요.
- prettier 설정으로는 잡을 수 없네.

- 이렇게 element가 전역변수로 관리되는게 맞을까?
- props로 받으려니까 서로 엮여있는 친구들이 참 많네...

- 일단 다시 네이밍부터 보자
- 현재 product와 item의 차이는 뭐지?
- product와 cartItem으로 나눠서 사용하자.

- 일단 순수함수처럼 보이는 애들부터 리팩토링해보자.
- updateStockStatus 리팩토링(내부만 깔끔하게)
- 마찬가지로 renderBonusPoints도 리팩토링
- updateProductSelectOptions 리팩토링(여기선 replaceChildren이란 놈을 처음 학습!)
- 이제 다음은 더 큰 단위의 함수들 개선해보자...

- 일단 모든 전역변수를 지역변수로 만들고, 각 함수들은 props로 받아오도록 수정
- 흠... 어떻게든 DOM 객체 관련 변수들은 꾸역꾸역 넣었는데, let으로 관리되던 값들이 문제가 생김
- props로 받아와서 함수 내부에서 수정한다? 옳지 못한 일.
- 그렇다면 이 두개를 깔끔하게 관리할 방법을 생각해봐야되는데...

> 전역 변수로 DOM 요소를 관리하면 유지보수와 추적이 어렵고, 결합도가 높아진다.
> 클로저로 DOM을 감싸 관리하는 방식은 여러 독립 함수에서 동일 DOM을 참조해야 할 경우 부적절하다.
> DOM 요소나 상태 데이터를 props처럼 함수에 계속 전달하는 방식은 지저분하고 예측 가능성을 해친다.
> 상태 데이터(let 변수)는 명시적이고 추적 가능한 형태로 관리할 필요가 있다.
> 따라서 상태는 별도의 StateStore에서 set/get 방식으로 중앙 관리하고, 구독 기반으로 DOM 업데이트를 연결하는 구조가 적절하다.
> DOM은 하나의 커다란 DOMStore에 모두 모아두기보다는, 기능 단위로 DOM 관리 객체를 분리하는 것이 더 유지보수에 유리하다.
> 예: CartDOM, ProductDOM, FlashSaleDOM 등
> 이렇게 분리하면 각 UI 블록별로 역할이 명확해지고, 변경이 국소화되며, 테스트 및 협업이 쉬워진다.

- 전역변수 let으로 관리되던 애들을 하나로 모아 store에 저장
- get, set 방식으로 관리 - 데이터의 흐름을 단방향으로
- 아 이래서 리액트에서 불변성을 그렇게 강조했구나

- 그러면 이제 UI도 분리해보자
- 그런데, UI에서 사용하던 다른 UI들을 init에 넣어줘야할까, 아니면 따로 필요한 곳에서 호출해야할까?
- UI는 UI끼리, 핸들러에 필요한 UI 요소는 핸들러에서 받을 수 있게 수정
- 계속 init()을 쓸까, 아니면 아예 클래스로 만들고 constructor에서 초기화할까?
- 리액트로의 마이그레이션 편의성도 생각해 함수형으로 처리하자
- 다음은, 이렇게 모든 DOM을 하나하나 파일로 관리해줘야할까? 기능이 없는 놈들도?
- layoutDOM을 따로 만들어서 관리하는 방식으로 수정

- 계속 고민하는 부분: DOM을 외부에 store 처럼 관리했을 때, 비즈니스 로직 함수가 해당 DOM을 사용하는 경우 props로 받아오는 것이 아니기 때문에 결국 외부에 사이드 이팩트를 제공하는 것이다. 즉, 순수함수가 아니게 되ㅠ
- 그렇다고 모든걸 props drilling 당하면 끔찍한 코드가 아닌가? 결국 eventHandler에서 사용하겠다고 메인에서 부터 2-3 댑스를 타고 넘기는게 맞나?
- 리액트는 함수형 프로그래밍이지만, 과연 어디까지 순수함수를 추구해야하고 코드의 가독성과의 저울질에서 어떤 균형점을 찾아야할까.

- get/set 구조로 store를 만들었는데, observer 패턴이 필요없음 -> 왜냐면 action에서 직접 render를 해버림

#### 고민한 부분들

- 함수 네이밍 컨벤션 : create vs render vs update vs init

- 동작 접두어의 명확한 기준 설정

// 🤔 혼란스러운 상황

- create와 render의 차이가 모호함
- update가 UI 업데이트인지 데이터 업데이트인지 불분명
- init의 사용 범위가 불명확

// ✅ 개선된 기준
create: 새로운 DOM 요소를 생성할 때만 사용
render: 상태를 기반으로 UI를 새로 그릴 때 사용
update: 기존 데이터나 상태를 수정할 때 사용
init: 초기 설정을 담당할 때 사용

- 비슷한 동작의 함수명 통일

-

```js
// 🤔 문제가 된 상황
calculateCart();
calculateCartTotals();
// 둘의 차이가 불분명함

// ✅ 개선안
calculateCartAmounts(); // 순수 계산 함수
processCartUpdate(); // 프로세스 관리 함수
```

- 계산과 로직 분리
- 단일 책임 원칙(SRP)

#### 개미굴에 빠지지 말자

## 심화로 넘어가자

- 리액트 설치

```bash
pnpm i react react-dom
pnpm i -D @types/react @types/react-dom
```

- vite 설정

```bash
pnpm add -D @vitejs/plugin-react
```

```json
{
  "plugins": ["react"]
}
```

- JSX 컴파일 Vite는 기본적으로 JSX 지원 X → 플러그인이 Babel preset처럼 역할함
- Fast Refresh 코드 수정 시 UI 자동 반영 (HMR) 지원
- 자동 JSX import import React from 'react' 생략 가능하게 함

- 리액트 프로젝트 생성

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```tsx
import React from 'react';

const App = () => {
  return <main>...</main>;
};

export default App;
```

- 아무튼 이제 리액트로 코드 작성
- 근데 사실 기존 코드에서 재활용 할 수 있는게 있을까?
- 일단 문제는 DOM에 접근하는 코드들이 있는데, 리액트는 컴포넌트로 가상 돔을 만들어서 사용하니까 흐름이 조금 다른듯
- 기존 로직들중에 살아남을 수 있는게 있나?
- 난 UI랑 상태관리만 신경쓰면 될까?

### 그전에 eslint+prettier를 biome으로 변경하기

- biome 설치
- biome.json 생성
- 그런데 룰이 바꼈으니, 기존 코드도 바뀌지 않을까? 그러면 안되지.
- 기존 basic 코드는 prettier+eslint 그대로, advanced는 biome으로 변경
- prettierignore, eslintignore, biomeignore 파일로 분기처리

### 리액트 코드 작업 시작

- 우선은 순수함수들은 다 가져다 쓴다고 생각 -> 해당 함수들을 ts로 래핑해서 쓰자
- 렌더 로직이 있는 애들은 눈물을 머금고 새로 만들자.
- UI단도 새로 만들어야지. 대신 기존에 있던 스타일들을 받아올 수 있을 듯.

- 우선 순수함수들을 로직 파일들에서 분리해내자. (응집도를 낮추고, 재활용성을 높이기) <- 여기까지는 basic 코드에서 작업

#### UI 컴포넌트 작업

- 우선 UI 컴포넌트부터 생성 (로직, 핸들러 등 내부 X, 오직 스타일 및 속성만)

#### 상태 관리 로직 변경

- UI 다음에 뭘 할 수 있을까 했는데, UI 내부를 건드리자니 로직을 바꿔와야해서 태스크 단위가 너무 커짐.
- 우선 상태 관리 로직을 먼저 변경하자.
- state + props 방식을 사용할까? vs context api 방식을 사용할까? vs 전역 상태 관리 라이브러리 사용할까?
- 기존 구조와 가장 닮아있는 context api 방식으로 진행

#### 순수함수 ts 래핑

- 계산, alert, 포맷팅 등 외부 DOM을 건드리지 않고, 순수함수로 구성된 코드들 ts로 래핑
- 이렇게 하면 외부 DOM을 건드리지 않고, 순수함수로 구성된 코드들을 재활용할 수 있음
- 또한, 타입 추론이 쉬워짐

- 다음엔, render, logic, handler 중 고민
- handler와 render는 엮여있어서 따로 관리해봤자 의미가 없음

#### render 컴포넌트 작업

- 이미 기본 컴포넌트 구조는 만들어둔 상태
- render → React 컴포넌트로의 변환이 가장 명확함
- 이후에 logic과 handler를 수정하기가 더 쉬워질 것

- 기존에 그냥 DOM에 직접 element를 추가하고, 그 element에 직접 저장하던 방식을 state나 context에 저장하도록 변경해야 함
