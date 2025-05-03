import BaseElement from './BaseElement';

class Title extends BaseElement {
  constructor() {
    super({
      tag: 'h1',
      className: 'text-2xl font-bold mb-4',
      textContent: '장바구니',
    });
  }
}

const $title = new Title().get();

export default $title;
