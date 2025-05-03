import { RecentSelectedId } from '../stores';
import { SUGGEST_DISCOUNT_RATE } from './constants';
import ITEMS from '../constants/items';
import updateSelectOptions from '../updater/updateSelectOptions';

let recentSelectedId = new RecentSelectedId().get();

const getSuggestItem = () => {
  return ITEMS.find((item) => item.id !== recentSelectedId && item.stock > 0);
};

const calculateSuggestItemPrice = (suggestItem) => {
  return Math.round(suggestItem.price * SUGGEST_DISCOUNT_RATE);
};

export const suggest = () => {
  if (!recentSelectedId) return;

  let suggestItem = getSuggestItem();
  if (!suggestItem) return;

  alert(suggestItem.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
  suggestItem.price = calculateSuggestItemPrice(suggestItem);

  updateSelectOptions();
};
