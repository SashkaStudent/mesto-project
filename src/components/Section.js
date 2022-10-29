export default class Section {
  constructor({ items, renderer }, selector) {
    this._section = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  renderNewItem(item) {
    this._renderer(item);
  }

  addItem(itemElement) {
    this._section.prepend(itemElement);
  }

  removeItem(elementForDelete) {
    this._items.remove(elementForDelete);
    elementForDelete.remove();
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
