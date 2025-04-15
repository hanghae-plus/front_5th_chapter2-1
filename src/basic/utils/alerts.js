import ITEMS from '../constant';
import { RecentSelectedId } from '../store';
import updateItemOption from './updateOption';

/**번개세일을 진행합니다.*/
const alertLuckyEvent = () => {
  setTimeout(function () {
    setInterval(function () {
      let luckyItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        updateItemOption();
      }
    }, 30000);
  }, Math.random() * 10000);
};

/**알림으로 구매를 제안합니다.*/
const alertSuggest = () => {
  let recentId = new RecentSelectedId();
  let recentSelectedId = recentId.get();
  setTimeout(function () {
    setInterval(function () {
      if (recentSelectedId) {
        let suggest = ITEMS.find(function (item) {
          return item.id !== recentSelectedId && item.stock > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          updateItemOption();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const alerts = () => {
  alertLuckyEvent();
  alertSuggest();
};

export default alerts;
