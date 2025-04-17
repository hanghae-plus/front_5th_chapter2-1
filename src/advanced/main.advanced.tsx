import React from 'react';
import ReactDOM from 'react-dom/client';
import MyApp from './App';

// const root = document.getElementById('app') as HTMLElement;
// ReactDOM.createRoot(root).render(<App />);

import { createRoot } from 'react-dom/client';

// 기존 HTML 컨텐츠를 지웁니다.
document.body.innerHTML = '<div id="app"></div>';

// 대신에 여러분이 작성한 React 컴포넌트를 렌더링합니다.
const appElement = document.getElementById('app');
if (!appElement) {
	throw new Error("Failed to find the 'app' element in the DOM.");
}
const root = createRoot(appElement);
root.render(<MyApp />); // JSX 문법으로 컴포넌트를 렌더링