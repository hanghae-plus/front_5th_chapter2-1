import { prodList } from "../state";
import { elementms } from "../pages/App";
import store from "../state/state";

export function notifyDiscount() {
        setTimeout(() => {
            setInterval(() => {
                const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
                if (Math.random() < 0.3 && luckyItem.quantity > 0) {
                    luckyItem.price = Math.round(luckyItem.price * 0.8);
                    alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                    updateSelOpts();
                }
            }, 30000);
        }, Math.random() * 10000);
    }

export function notifyEvent() {
    setTimeout(function () {
        setInterval(function () {
            if (store.state.lastSel) {
                var suggest = prodList.find(function (item) { return item.id !== store.state.lastSel && item.quantity > 0; });
                if (suggest) {
                    alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                    suggest.price = Math.round(suggest.price * 0.95);
                    updateSelOpts();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}    

export function updateSelOpts() {
            //useEffect안에서 쓸 함수
            elementms.productSelect.innerHTML = '';
            prodList.forEach(function (item) {
                var opt = document.createElement('option');
                opt.value = item.id;
                opt.textContent = item.name + ' - ' + item.price + '원';
                if (item.quantity === 0) opt.disabled = true;
                elementms.productSelect.appendChild(opt);
            });
        }