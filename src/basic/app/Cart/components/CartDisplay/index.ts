import { ElementIds } from '../../../../../shared/app/constants.ts';
import { handleClickCartDisp } from './logic';

export const createCartDisplay = (): HTMLDivElement => {
  const $cartDisplay = document.createElement('div');
  $cartDisplay.id = ElementIds.CART_DISP;
  $cartDisplay.addEventListener('click', handleClickCartDisp);

  return $cartDisplay;
}; 