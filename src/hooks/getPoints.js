import { store } from "../store/store.js"

// 포인트계산
export function getPoints (sum) {
    const { totalAmt } = store.state;
    const bonusPts = Math.floor(totalAmt / 1000);

    store.state.bonusPts = bonusPts;

    let ptsTag = document.getElementById('loyalty-points');

    if (!ptsTag) {
        ptsTag = document.createElement('span');
        ptsTag.id = 'loyalty-points';
        ptsTag.className = 'text-blue-500 ml-2';
        sum.appendChild(ptsTag);
    }
    
    ptsTag.textContent = `(포인트: ${bonusPts})`;
}