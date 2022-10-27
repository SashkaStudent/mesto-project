import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupFormSelector, formSelector, submitButtonSelector, inputsSelector },
    handleFormSubmit,
    { actionText, inProgressText }
  ) {
    super(popupFormSelector);
    this._formElement = this._popup.querySelector(formSelector);
    this._inputs = this._formElement.querySelectorAll(inputsSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(submitButtonSelector);
    this._actionText = actionText;
    this._inProgressText = inProgressText;
  }

  open(){
    super.open();
    this._formElement.reset();
  }

  getFormElement(){
    return this._formElement;
  }

  _getInputValues() {
    return Array.from(this._inputs).reduce((accum, currentInput) => {
      accum[currentInput.name] = currentInput.value;
      return accum;
    }, {});
  }

  _setButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._setButtonText(this._inProgressText); //Меняем контент кнопки
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._setButtonText(this._actionText); //Меняем контент кнопки 
        });
    });
    super.setEventListeners();
  }
}
