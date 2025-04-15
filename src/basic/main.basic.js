import { MainPage } from './pages/main';

function main() {
  // DOM 레이아웃 생성
  const root = document.getElementById('app');
  root.innerHTML = MainPage.template();
  // 연결된 mount 핸들러 수행
  MainPage.onMount?.();
}

main();
