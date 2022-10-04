import "../pages/index.css";
import { makeNewCard } from "./card.js";
import { validationOptions } from "./data.js";
import {
  closePopup,
  imageWindow,
  newItemWindow,
  openPopup,
  profileEditWindow,
  avatarEditWindow,
  changeButtonContent,
} from "./modal.js";
import { enableValidation, resetPopupValidation } from "./validation.js";
import {
  deleteCard,
  deleteLike,
  getCards,
  getProfile,
  postCard,
  putLike,
  setAvatar,
  setProfile,
} from "./api.js";

const elementsList = document.querySelector(".elements__list");

const profile = {
  data: {},
  nameNode: document.querySelector(".profile__name"),
  avatarNode: document.querySelector(".profile__avatar-container"),
  avatarImageNode: document.querySelector(".profile__avatar"),
  employmentNode: document.querySelector(".profile__employment"),
  editButtonNode: document.querySelector("#editProfileButton"),
  newItemButtonNode: document.querySelector("#addNewItemButton"),
};

getProfile().then((profileData) => {
  profile.data = profileData;
  profile.nameNode.textContent = profileData.name;
  profile.employmentNode.textContent = profileData.about;
  // console.log(profileData);
  // console.log(profile);
  profile.avatarImageNode.src = profileData.avatar;
});

getCards().then((cards) => {
  // console.log(cards);
  cards.forEach((card) => {
    const isForeign = card.owner._id !== profile.data._id;
    const cardElement = makeNewCard(card, isForeign);
    const liked = card.likes.some((like) => {
      return like._id === profile.data._id;
    });
    if (liked)
      cardElement
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
    elementsList.append(cardElement);
  });
});

profile.editButtonNode.addEventListener("click", handleEditProfileClick);
profile.newItemButtonNode.addEventListener("click", handleNewItemClick);
profileEditWindow.formNode.addEventListener("submit", handleEditProfileSubmit);
newItemWindow.formNode.addEventListener("submit", handleNewItemSubmit);
avatarEditWindow.formNode.addEventListener("submit", handleEditAvatarSubmit);

profile.avatarNode.addEventListener("click", () => {
  openPopup(avatarEditWindow.popupNode);
  resetPopupValidation(avatarEditWindow.popupNode, validationOptions);
});

elementsList.addEventListener("click", (evt) => {
  const currentClassList = evt.target.classList;
  if (currentClassList.contains("element__image")) {
    handleImageClick(evt);
  } else if (currentClassList.contains("element__like-button")) {
    const currentCard = evt.target.closest(".element");
    if (evt.target.classList.contains("element__like-button_active")) {
      deleteLike(currentCard.dataset.cardId).then((card) => {
        currentCard.querySelector(".element__likes-count").textContent =
          card.likes.length;
      });
    } else {
      putLike(currentCard.dataset.cardId).then((card) => {
        currentCard.querySelector(".element__likes-count").textContent =
          card.likes.length;
      });
    }

    toggleLike(evt);
  } else if (
    currentClassList.contains("element__delete-button") &&
    !currentClassList.contains("element__delete-button_disabled")
  ) {
    handleDeleteElement(evt);
  }
});

function handleEditProfileClick() {
  profileEditWindow.nameInputNode.value = profile.nameNode.textContent;
  profileEditWindow.employmentInputNode.value =
    profile.employmentNode.textContent;
  openPopup(profileEditWindow.popupNode);
  resetPopupValidation(profileEditWindow.popupNode, validationOptions);
}

function handleNewItemClick() {
  newItemWindow.formNode.reset();
  openPopup(newItemWindow.popupNode);
  resetPopupValidation(newItemWindow.popupNode, validationOptions);
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
  const cardElement = event.target.closest(".element");
  deleteCard(cardElement.dataset.cardId).then(() => {
    event.target.closest(".element").remove();
  });
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  changeButtonContent(profileEditWindow.popupNode, "Сохранение...", true);

  setProfile(
    profileEditWindow.nameInputNode.value,
    profileEditWindow.employmentInputNode.value
  ).then((profileData) => {
    profile.nameNode.textContent = profileData.name;
    profile.employmentNode.textContent = profileData.about;
  }).finally(()=>{
    changeButtonContent(profileEditWindow.popupNode, "Сохранить", false);
    closePopup(profileEditWindow.popupNode);
  });
  // profile.nameNode.textContent = profileEditWindow.nameInputNode.value;
  // profile.employmentNode.textContent =
  // profileEditWindow.employmentInputNode.value;
}

function handleEditAvatarSubmit(event) {
  event.preventDefault();
  changeButtonContent(avatarEditWindow.popupNode, "Сохранение...", true);
  setAvatar(avatarEditWindow.linkInputNode.value)
    .then((avatarData) => {
      profile.avatarImageNode.src = avatarData.avatar;
    })
    .finally(() => {
      changeButtonContent(avatarEditWindow.popupNode, "Сохранить", false);
      avatarEditWindow.linkInputNode.value = "";
      closePopup(avatarEditWindow.popupNode);
    });
}

function handleNewItemSubmit(event) {
  event.preventDefault();
  const card = {
    name: newItemWindow.nameInputNode.value,
    link: newItemWindow.linkInputNode.value,
  };
  changeButtonContent(newItemWindow.popupNode, "Создание...", true);
  postCard(card)
    .then((cardData) => {
      const cardElement = makeNewCard(cardData, false);
      elementsList.prepend(cardElement);
    })
    .finally(() => {
      changeButtonContent(newItemWindow.popupNode, "Создать", false);
      closePopup(newItemWindow.popupNode);
    });
}

enableValidation(validationOptions);
