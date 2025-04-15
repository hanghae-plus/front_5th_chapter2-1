import { DOM_IDS, STYLES } from '../consts';
import { createElement } from '../utils';

export const LayoutDOM = {
  _appRoot: document.getElementById(DOM_IDS.APP),
  _mainContainer: null,
  _mainWrapper: null,
  _mainHeader: null,

  init() {
    this._mainContainer = createElement('div', {
      id: 'main-container',
      className: STYLES.CONTAINER.MAIN,
    });

    this._mainWrapper = createElement('div', {
      id: 'main-wrapper',
      className: STYLES.CONTAINER.WRAPPER,
    });

    this._mainHeader = createElement('h1', {
      id: 'main-header',
      className: STYLES.HEADER.TITLE,
      textContent: '장바구니',
    });
  },

  get() {
    return {
      mainAppRoot: this._appRoot,
      mainContainer: this._mainContainer,
      mainWrapper: this._mainWrapper,
      mainHeader: this._mainHeader,
    };
  },
};
