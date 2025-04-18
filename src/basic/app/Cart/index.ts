import { ElementIds } from '../../../shared/app/constants.ts';
import { createCartDisplay } from './components/CartDisplay/index.js';
import { createAddProduct } from './components/AddProduct/index.ts';
import { getBonusPts } from '../../../shared/app/Cart/calculation.ts';

function createHeaderTxt() {
  const $hTxt = document.createElement('h1');
  $hTxt.className = 'text-2xl font-bold mb-4';
  $hTxt.textContent = '장바구니';
  return $hTxt;
}

export function createPointTag(): HTMLElement {
  const $ptsTag = document.createElement('span');
  $ptsTag.id = ElementIds.LOYALTY_POINTS;
  $ptsTag.className = 'text-blue-500 ml-2';
  return $ptsTag;
}

function createSum() {
  const $sum = document.createElement('div');
  $sum.id = ElementIds.SUM;
  $sum.className = 'text-xl font-bold my-4';
  $sum.textContent = '총액: ' + '0원';

  const $ptsTag = createPointTag();
  const bonusPts = getBonusPts(0);
  $ptsTag.textContent = '(포인트: ' + bonusPts + ')';
  $sum.appendChild($ptsTag);

  return $sum;
}

export function createCart() {
  const $wrap = document.createElement('div');
  $wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  const cartCompositions = [
    createHeaderTxt(),
    createCartDisplay(),
    createSum(),
    ...createAddProduct(),
  ];

  cartCompositions.map((child) => $wrap.appendChild(child));
  return $wrap;
}
