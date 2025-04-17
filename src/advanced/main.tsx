import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/* HTML의 #root 요소에 React 앱을 붙임
 * !: non-null assertion operator ( 널 아님 단언 연산자 ).. ts의 null 체크를 생략하게 함.. null이 아니니까 체크하지마..!
 * document.getElementById('root') 의 타입을 `HTMLElement | null` -> `HTMLElement`로 단언
 */
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
