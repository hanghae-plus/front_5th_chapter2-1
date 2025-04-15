import { DOM_IDS, STYLES } from '../consts';

export const LayoutDOM = {
  _appRoot: document.getElementById(DOM_IDS.APP),
  _mainContainer: null,
  _mainWrapper: null,
  _mainHeader: null,

  init() {
    this._mainContainer = document.createElement('div');
    this._mainWrapper = document.createElement('div');
    this._mainHeader = document.createElement('h1');

    this._mainContainer.id = DOM_IDS.CONTAINER.MAIN;
    this._mainContainer.className = STYLES.CONTAINER.MAIN;

    this._mainWrapper.id = DOM_IDS.CONTAINER.WRAPPER;
    this._mainWrapper.className = STYLES.CONTAINER.WRAPPER;

    this._mainHeader.id = DOM_IDS.HEADER.TITLE;
    this._mainHeader.className = STYLES.HEADER.TITLE;
    this._mainHeader.textContent = '장바구니';
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
