// 컨테이너 요소 묶음 +  heading
const container = () => {
  // 요소 생성
  const containerEl = document.createElement('div');
  const wrapperEl = document.createElement('div');
  const titleEl = document.createElement('h1');

  // 스타일 설정
  containerEl.className = 'bg-gray-100 p-8';
  wrapperEl.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  titleEl.className = 'text-2xl font-bold mb-4';

  // 텍스트
  titleEl.textContent = '장바구니';

  // DOM 구조 조립
  containerEl.appendChild(wrapperEl);
  wrapperEl.appendChild(titleEl);

  // 렌더링 함수
  const render = (targetEl) => {
    console.log('jiwon targetEl', targetEl);
    targetEl.appendChild(containerEl);
  };

  return { wrapperEl, render };
};

export { container };
