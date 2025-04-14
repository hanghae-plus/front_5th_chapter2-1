export const LayoutDOM = {
  _appRoot: document.getElementById('app'),
  _mainContainer: null,
  _mainWrapper: null,
  _mainHeader: null,

  init() {
    this._mainContainer = document.createElement('div');
    this._mainWrapper = document.createElement('div');
    this._mainHeader = document.createElement('h1');

    this._mainContainer.id = 'main-container';
    this._mainContainer.className = 'bg-gray-100 p-8';

    this._mainWrapper.id = 'main-wrapper';
    this._mainWrapper.className =
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

    this._mainHeader.id = 'main-header';
    this._mainHeader.className = 'text-2xl font-bold mb-4';
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
