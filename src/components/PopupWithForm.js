import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({
    popupFormSelector,
    formSelector,
    submitButtonSelector,
    inputsSelector,
  }, handleFormSubmit) {
    super(popupFormSelector);
    this._formElement = this._popup.querySelector(formSelector);
    this._inputs = this._formElement.querySelectorAll(inputsSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(submitButtonSelector);
  }

  _getInputValues() {
    return Array.from(this._inputs).reduce((accum, currentInput) => {
      accum[currentInput.name] = currentInput.value;
      return accum;
    }, {});
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      (this._handleFormSubmit(this._getInputValues()))
        .then(() => this.close())
        .finally(() => {
          //button -> default
        });

    })
    super.setEventListeners();
  }

}
