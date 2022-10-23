export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    group: "plus-cohort-15",
    authorization: "e1c7a508-b41b-4183-8776-1689fa2e2758",
    "Content-Type": "application/json",
  },
};

export const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  idSuffix: "Error",
};

export const popupImageSelector = "#popupImage";
