let title;
function createTitleElement() {
  title = document.createElement('h1');
  title.className = 'text-2xl font-bold mb-4';
  title.textContent = '장바구니';
  return title;
}

export default createTitleElement;
