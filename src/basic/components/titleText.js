export default function titleText(tag, title) {
  const hTxt = document.createElement(tag);
  hTxt.className = 'text-2xl font-bold mb-4';
  hTxt.textContent = title;
  return hTxt;
}
