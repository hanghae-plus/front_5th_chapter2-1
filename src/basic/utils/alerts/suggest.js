import ITEMS from '../../constants/items';
import { RecentSelectedId } from '../../stores';
import updateSelectOptions from '../updateSelectOptions';
import { SUGGEST_DISCOUNT_RATE } from './constants';

export const suggest = () => {
  let recentSelectedId = new RecentSelectedId().get();
  if (!recentSelectedId) return;

  let suggest = ITEMS.find((item) => {
    return item.id !== recentSelectedId && item.stock > 0;
  });

  if (!suggest) return;

  alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
  suggest.price = Math.round(suggest.price * SUGGEST_DISCOUNT_RATE);

  updateSelectOptions();
};
