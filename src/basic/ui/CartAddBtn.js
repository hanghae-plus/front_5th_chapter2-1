// 추가 버튼
const cartAddBtn = () => {
    const buttonElement = document.createElement('button');
    buttonElement.id = 'add-to-cart';
    buttonElement.className = 'bg-blue-500 text-white px-4 py-2 rounded';
    buttonElement.textContent = '추가';

    // 이벤트 핸들러 등록 함수
    const setupEventHandler = (handler) => {
        buttonElement.addEventListener('click', handler);
    };

    const render = (targetEl) => {
        targetEl.appendChild(buttonElement);
    };

    return {
        element: buttonElement,
        render,
        setupEventHandler,
    };
};

export { cartAddBtn };
