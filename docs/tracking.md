# Code Tracking Progress

> legacy(dirty) code를 점진적으로 clean code로 개선 시킨 과정을 트래킹합니다.
>
> 커밋보다 자세하고, 한 눈에 전과정이 보일 수 있도록 기록하기 위한 MD파일입니다.

## 01. eslint, prettier를 설정합니다.

- prettier같은 경우는 아래와 같이 구성합니다.
  ```prettier
  {
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto"
  }
  ```

## 02. main.basic.js의 동작을 이해합니다.

- 기존 레거시 코드를 잘 이해해야 리펙터링 과정에서, 같은 동작으로 더 나은 코드를 작성할 수 있다고 생각합니다.

- 해당 과정에서 맥락을 파악하기 위해 줄바꿈과 주석(설명)을 1차적으로 적용합니다.

- 주석의 경우, 초기 동작 이해를 위해 세세히 기록합니다.
