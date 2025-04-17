import React from 'react';

import { handleClickCartDisp } from './logic.js';
import { ElementIds } from '../../../../../shared/app/constants.ts';

export function CartDisplay() {
  return <div id={ElementIds.CART_DISP} onClick={handleClickCartDisp}></div>;
}
