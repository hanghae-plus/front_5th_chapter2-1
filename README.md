## 배포

- 원본: https://anveloper.github.io/front_5th_chapter2-1/
- 바닐라: https://anveloper.github.io/front_5th_chapter2-1/index.basic.html
- 리액트: https://anveloper.github.io/front_5th_chapter2-1/index.advanced.html

## 과제 체크포인트

<details><summary>기본과제</summary>

- [x] 코드가 Prettier를 통해 일관된 포맷팅이 적용되어 있는가?
- [x] 적절한 줄바꿈과 주석을 사용하여 코드의 논리적 단위를 명확히 구분했는가?
- [x] 변수명과 함수명이 그 역할을 명확히 나타내며, 일관된 네이밍 규칙을 따르는가?
- [x] 매직 넘버와 문자열을 의미 있는 상수로 추출했는가?
- [x] 중복 코드를 제거하고 재사용 가능한 형태로 리팩토링했는가?
- [x] 함수가 단일 책임 원칙을 따르며, 한 가지 작업만 수행하는가?
- [x] 조건문과 반복문이 간결하고 명확한가? 복잡한 조건을 함수로 추출했는가?
- [x] 코드의 배치가 의존성과 실행 흐름에 따라 논리적으로 구성되어 있는가?
- [x] 연관된 코드를 의미 있는 함수나 모듈로 그룹화했는가?
- [x] ES6+ 문법을 활용하여 코드를 더 간결하고 명확하게 작성했는가?
- [x] 전역 상태와 부수 효과(side effects)를 최소화했는가?
- [x] 에러 처리와 예외 상황을 명확히 고려하고 처리했는가?
- [x] 코드 자체가 자기 문서화되어 있어, 주석 없이도 의도를 파악할 수 있는가?
- [x] 비즈니스 로직과 UI 로직이 적절히 분리되어 있는가?
- [x] 코드의 각 부분이 테스트 가능하도록 구조화되어 있는가?
- [x] 성능 개선을 위해 불필요한 연산이나 렌더링을 제거했는가?
- [x] 새로운 기능 추가나 변경이 기존 코드에 미치는 영향을 최소화했는가?
- [x] 코드 리뷰를 통해 다른 개발자들의 피드백을 반영하고 개선했는가?
- [x] (핵심!) 리팩토링 시 기존 기능을 그대로 유지하면서 점진적으로 개선했는가?
</details>

<details><summary>심화과제</summary>

- [x] 변경한 구조와 코드가 기존의 코드보다 가독성이 높고 이해하기 쉬운가?
- [x] 변경한 구조와 코드가 기존의 코드보다 기능을 수정하거나 확장하기에 용이한가?
- [x] 변경한 구조와 코드가 기존의 코드보다 테스트를 하기에 더 용이한가?
- [x] 변경한 구조와 코드가 기존의 모든 기능은 그대로 유지했는가?
- [x] (핵심!) 변경한 구조와 코드를 새로운 한번에 새로만들지 않고 점진적으로 개선했는가?
</details>

## 과제 셀프회고

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?
- 코드 컨벤션의 경우 어느정도 대세를 따르는 룰이 몸에 베어있어 팀 토의 없이 작성했던 룰과 팀 컨벤션을 다시한번 정하고 나서의 룰이 크게 차이가 없었습니다.
- 다만, 진행을 하면서 디렉토리 구조를 잘 짜는 방법에 대하여는 여러번 고민을 하게 되었고, 멘토링 시간에도 테오에게 해당 관련한 질문을 드렸습니다.
- 처음 바닐라 JS의 1~3차 리팩토링 과정에서는 너무 오버엔지니어링하는 것은 아닌가? 폴더를 나눴는데, 한개의 파일을 위한 폴더는 잘된 구분인가? 하는 의문감이 들었었습니다. 
- 멘토링 중 프로젝트의 규모와 진행 상황에 따라 디렉토리 구조가 점차 달라진다라고 답변해 주신 포인트가 저에게 필요했던 해답이었던 것 같습니다.
- 과제는 물론 작은 기능에 대한 리팩토링이다보니 초기의 단순하고 직관적인 디렉토리 구조로 파일의 쓰임새 별로 구분하더라도 크게 어려움이 없지만, 
- 프로젝트 규모가 점차 커지면서 하나의 기능과 관련된 파일들이 여러군데에 분산되버렸을 때의 리팩토링의 방향성은 다를 것 라고 답변받은 부분이 과제의 리팩토링과 현업의 리팩토링대한 괴리감을 해소해주는 좋은 문장이었습니다.

- 따라서, 이번 과제를 진행하면서 디렉토리 구조를 어떻게 가져가야 하는 지에 대하여 제일 신경을 많이 쓰게 되었고, 어느정도 현업에서도 이렇게 해봐야지 하는 방향성은 찾은 것 같습니다.
- 결과적으로 다음처럼 리팩토링을 하게되었습니다.
![바닐라JS(좌) 리액트(우)](https://github.com/user-attachments/assets/b6ed6148-ce8e-4d62-b879-1f3f70889585)

- 회사에서도 바닐라 JS를 쓰는 솔루션들이 있다보니, 완벽하게 리액트 스러운 바닐라 디렉토리 구조를 만들기 보단, `render` 나 `setup`같이 타협한 구조도 포함되게 되었습니다.
-  리액트와 타입스크립트로 개선할때는 이벤트와 함수들이 자신의 자리를 잘 갖출 수 있는 환경을 이 라이브러리가 정말 잘 제공해주고 있구나 하는 것을 다시한번 깨달았습니다.

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?
- 발제를 받고 토~일간에 바닐라 JS는 최대한 리팩토링을 하였었는데, 화요일 세션중에 리액트 스러움이 `createElement`가 아니라 `<div></div>`의 템플릿 형식을 말하는 것이었다는 부분이 참 아쉬웠습니다.
- 생각해보니 1~3주차 때의 예시들도 DOM을 명시하는 예시들이 다 백틱으로된 템플릿 들이었는데, 어쩌다보니 JQuery를 만들어 버린 부분이 개발방향을 잘못잡았구나 하는 심정이었습니다.

<details><summary>산으로 가버린 Custom JQeury</summary>

```javascript
/**
 * 지정된 태그 혹은 선택자에 따라 적절한 DOM 노드를 반환
 *
 * - `"#id"` 또는 `".class"`로 시작하면 `document.querySelector`를 사용해 DOM을 조회
 * - `"frag"` 문자열을 전달하면 `DocumentFragment`를 반환
 * - 그 외에는 일반 DOM 요소를 생성하며, 전달된 `props`를 속성으로 할당
 *
 * @param {string} type
 * @param {Object} [props]
 * @param {string} [props.id]
 * @param {string | string[]} [props.className]
 * @param {string} [props.textContent]
 * @param {string} [props.value]
 * @param {boolean} [props.disabled]
 * @param {Object<string, string>} [props.dataset] data-* 오브젝트
 * @param {...(HTMLElement | Text | DocumentFragment | string)} children
 * @returns {HTMLElement | DocumentFragment | null} DOM 엘리먼트
 *
 * @example
 * const div = $("div", { className: "bg-gray-100 p-8", dataset: { productId: "p1" } });
 * const option = $("option", { value: "p1", textContent: "상품1", disabled: false });
 * const frag = $("frag");
 * const existingEl = $("#app"); // querySelector
 */
export const $ = (type, props = {}, ...children) => {
  // querySelector
  if (type.startsWith("#") || type.startsWith(".")) {
    return document.querySelector(type);
  }

  // fragment, 일반 element 생성 및 props 설정
  const element =
    type === "frag"
      ? document.createDocumentFragment()
      : document.createElement(type);

  Object.entries(props || {}).forEach(([key, value]) => {
    if (key === "dataset" && typeof value === "object") {
      // dataset 처리
      Object.entries(value).forEach(
        ([dataKey, dataValue]) => (element.dataset[dataKey] = dataValue),
      );
    } else {
      // id, className 및 기타 속성 처리
      if (key === "className" && Array.isArray(value)) value = value.join(" ");
      element[key] = value;
    }
  });

  // element children 생성 시 추가
  if (children && Array.isArray(children)) {
    children.forEach((el) => {
      if (!el) return;
      if (typeof el === "string") {
        element.appendChild(document.createTextNode(el));
      } else if (el instanceof Node) {
        element.appendChild(el);
      }
    });
  }
  return element;
};

```
</details>

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)
![왜 매출이 잘나오는 건데](https://github.com/user-attachments/assets/c4b48a4d-f5e1-482c-bfd7-0064990513a9)
- 어제도 2시간 정도 기존 솔루션 쪽 작업할 일이 있어서 코드를 보다 문득 생각이 났습니다.
- 멘토링때 말씀드렸던 수천 수만줄 짜리 코드입니다.
- 4만줄 짜리는 다른 분만 직접적으로 크게 작업하시고, 저는 left_menu나 top_menu쪽 7000~9000줄 짜리 주로 코드를 보고 있습니다.
- 해당 프로젝트에서는 prettier도 사용하지 못하고, 순수하게 손으로 컨벤션을 지켜가며 코딩중에 있다보니, 아마도 prettier를 적용하면 아래로 더 길어질 것입니다. ~어쩌면 이것 때문에 명명하는 컨벤션을 매우 숙달된것 일지도..~ 
- 완전한 새로운 버전으로 넘어가고 싶다는 마음이 굴뚝같지만, 당연하게도 그런 개발시간을 부여받지는 못하는 상태이고, 멘토링때 해주셨던 블록 단위로 잘게 쪼개는 방식으로 진행해보려고 합니다.

- 이부분에서 가장 걱정이 되는 것이 현대 js처럼 module 방식으로 import export 되어 변수들의 정확한 선언 위치라도 바로바로 알면 좋겠지만, 
- text/javascript 로 각자의 `<script>`가 순차적으로 들어오는 방식으로 코드가 작성되어있어서 사실 그 파일에서 선언하지 않은 변수들도 많은 상황입니다. 
- 이런 전역스코프에서 변수나 함수를 참조하는 경우에도 블록 방식으로 잘게 쪼개는 게 유효한 것일 지 궁금합니다...🥲

