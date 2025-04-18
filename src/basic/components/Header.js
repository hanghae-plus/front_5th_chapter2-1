export default function Header({ title }) {
  const $header = document.createElement('h1');
  $header.className = 'text-2xl font-bold mb-4';
  $header.textContent = title;
  return $header;
}
