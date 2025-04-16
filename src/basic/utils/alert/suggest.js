import { ADDITIONAL_DISCOUNT } from '../../consts';

export const alertSuggestedProduct = (item) => {
  alert(
    `${item.name}은(는) 어떠세요? 지금 구매하시면 ${ADDITIONAL_DISCOUNT.RATE * 100}% 추가 할인!`,
  );
};
