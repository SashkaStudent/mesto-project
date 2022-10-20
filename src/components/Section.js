export default class Section {
  constructor({ items, renderer }, selector) {
    this._section = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  addItem(itemElement) { // Переименовали item в itemElement
    this._section.prepend(itemElement);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
      // console.log(item);
      //this.addItem(cardElement);
    });

  };
}
