import { makeNewCard } from "./card.js";
import { initialCards, validationOptions } from "./data.js";
import {
  closePopup,
  imageWindow,
  newItemWindow,
  openPopup,
  profileEditWindow,
} from "./modal.js";
import { enableValidation } from "./validation.js";

const elementsList = document.querySelector(".elements__list");

initialCards.forEach((card) => {
  const cardElement = makeNewCard(card.name, card.link);
  elementsList.prepend(cardElement);
});

const profile = {
  nameNode: document.querySelector(".profile__name"),
  employmentNode: document.querySelector(".profile__employment"),
  editButtonNode: document.querySelector("#editProfileButton"),
  newItemButtonNode: document.querySelector("#addNewItemButton"),
};

profile.editButtonNode.addEventListener("click", handleEditProfileClick);
profile.newItemButtonNode.addEventListener("click", handleNewItemClick);
profileEditWindow.formNode.addEventListener("submit", handleEditProfileSubmit);
newItemWindow.formNode.addEventListener("submit", handleNewItemSubmit);

elementsList.addEventListener("click", (evt) => {
  const currentClassList = evt.target.classList;
  if (currentClassList.contains("element__image")) {
    handleImageClick(evt);
  } else if (currentClassList.contains("element__like-button")) {
    toggleLike(evt);
  } else if (currentClassList.contains("element__delete-button")) {
    handleDeleteElement(evt);
  }
});

function handleEditProfileClick() {
  profileEditWindow.nameInputNode.value = profile.nameNode.textContent;
  profileEditWindow.employmentInputNode.value =
    profile.employmentNode.textContent;
  openPopup(profileEditWindow.popupNode);
}

function handleNewItemClick() {
  newItemWindow.formNode.reset();
  openPopup(newItemWindow.popupNode);
}

function handleImageClick(event) {
  const currentElement = event.target.closest(".element");
  if (currentElement != null) {
    const currentElementImage = currentElement.querySelector(".element__image");
    const imageSrc = currentElementImage.src;
    const imageAlt = currentElementImage.alt;
    const elementTitle =
      currentElement.querySelector(".element__title").textContent;
    imageWindow.imageNode.src = imageSrc;
    imageWindow.imageNode.alt = imageAlt;
    imageWindow.captionNode.textContent = elementTitle;
  }
  openPopup(imageWindow.popupNode);
}

function toggleLike(event) {
  event.target.classList.toggle("element__like-button_active");
}

function handleDeleteElement(event) {
  event.target.closest(".element").remove();
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  const form = event;

  console.log(form);
  if (
    profileEditWindow.nameInputNode.value != "" &&
    profileEditWindow.employmentInputNode.value != ""
  ) {
    profile.nameNode.textContent = profileEditWindow.nameInputNode.value;
    profile.employmentNode.textContent =
      profileEditWindow.employmentInputNode.value;
    closePopup(profileEditWindow.popupNode);
  }
}

function handleNewItemSubmit(event) {
  event.preventDefault();
  if (
    newItemWindow.nameInputNode.value != "" &&
    newItemWindow.linkInputNode.value != ""
  ) {
    const cardElement = makeNewCard(
      newItemWindow.nameInputNode.value,
      newItemWindow.linkInputNode.value
    );
    elementsList.prepend(cardElement);
    closePopup(newItemWindow.popupNode);
  }
}

enableValidation(validationOptions);
