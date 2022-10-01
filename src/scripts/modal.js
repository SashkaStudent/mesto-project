// import { checkForm } from "./validation";

import { validationOptions } from "./data.js";
import { resetForm } from "./validation.js";

export const profileEditWindow = {
  popupNode: document.querySelector("#popupEditProfile"),
  nameInputNode: document.querySelector("#inputProfileName"),
  nameErrorNode: document.querySelector("#inputProfileError"),
  employmentInputNode: document.querySelector("#inputProfileEmployment"),
  employmentErrorNode: document.querySelector("#inputEmploymentError"),
  formNode: document
    .querySelector("#popupEditProfile")
    .querySelector(".popup__form"),
};

export const newItemWindow = {
  popupNode: document.querySelector("#popupNewItem"),
  nameInputNode: document.querySelector("#inputNewItemName"),
  linkInputNode: document.querySelector("#inputNewItemLink"),
  formNode: document
    .querySelector("#popupNewItem")
    .querySelector(".popup__form"),
};

export const imageWindow = {
  popupNode: document.querySelector("#popupImage"),
  imageNode: document.querySelector(".popup__figure-image"),
  captionNode: document.querySelector(".popup__figure-caption"),
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  const popupForm = popup.querySelector(".popup__form");
  if(popupForm) resetForm(popupForm, validationOptions);
  document.addEventListener("keydown", closePopupByEscHandler);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscHandler);
}


function closePopupByEscHandler(evt){
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) closePopup(popupOpened);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});