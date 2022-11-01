import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupFormSelector, formSelector, submitButtonSelector, inputsSelector },
    handleFormSubmit,
    inProgressText,
    onOpenHandler
  ) {
    super(popupFormSelector);
    this._formElement = this._popup.querySelector(formSelector);
    this._inputs = this._formElement.querySelectorAll(inputsSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(submitButtonSelector);
    this._startText = this._submitButton.textContent;
    this._inProgressText = inProgressText;
    this._onOpenHandler = onOpenHandler;
  }

  open() {
    this._formElement.reset();
    if (this._onOpenHandler) this._onOpenHandler();
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  getFormElement() {
    return this._formElement;
  }

  setInputsValues(values) {
    const inputs = Array.from(this._inputs);
    const names = Object.keys(values);

    inputs.forEach((input) => {
      if (names.includes(input.name)) input.value = values[input.name];
    });
  }

  _getInputValues() {
    return Array.from(this._inputs).reduce((accum, currentInput) => {
      accum[currentInput.name] = currentInput.value;
      return accum;
    }, {});
  }

  onResponseEnd() {
    this._submitButton.textContent = this._startText;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitButton.textContent = this._inProgressText;
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
