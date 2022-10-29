export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass, // класс делающий вид кнопки неактивным
      inputErrorClass, // добавляет инпуту красную рамку "popup__input_type_error"
      errorClass, // класс включает отображение элемента с сообщением ошибки "popup__input-error_active"
      idSuffix, //id элемента с сообщением ошибки формируется из id инпута + Error
      //  <input id="inputNewItemLink" ...
      //    <span id="inputNewItemLinkError" ..
      // Таким образом: errorElement = formElement.querySelector(`#${inputElement.id}${this._idSuffix}`);
    },
    formElement
  ) {
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    this._submitButtonElement =
      this._formElement.querySelector(submitButtonSelector);

    this._idSuffix = idSuffix;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formElement.addEventListener("reset", () => {
      this._resetPopupValidation();
    });
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}${this._idSuffix}`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}${this._idSuffix}`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _resetPopupValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}