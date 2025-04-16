import { state, dom } from '../store';

export function renderBonusPts() {
  dom.bonusPts = Math.floor(state.totalAmt / 1000);
  dom.sum.innerHTML += `
    <span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${dom.bonusPts})</span>
  `;
}
