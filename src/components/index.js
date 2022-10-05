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

getProfile().then(initProfile).then(initCards).catch(err=>{console.error(`Не удалось загрузить профиль. ${err}`)});

function initProfile() {
  getProfile().then((profileData=>{
    profile.data = profileData;
    profile.nameNode.textContent = profileData.name;
    profile.employmentNode.textContent = profileData.about;
    profile.avatarImageNode.src = profileData.avatar;
  }))
}

function initCards() {
  getCards().then((cards) => {
    cards.forEach((card) => {
      const cardElement = makeNewCard(
        card,
        profile.data._id,
        handleImageClick,
        handleLikeClick,
        handleDeleteElement
      );
      elementsList.append(cardElement);
    });
  }).catch(err=>{
    console.error(`Не удалось загрузить карточки. ${err}`)
  });
}

profile.editButtonNode.addEventListener("click", handleEditProfileClick);
profile.newItemButtonNode.addEventListener("click", handleNewItemClick);
profileEditWindow.formNode.addEventListener("submit", handleEditProfileSubmit);
newItemWindow.formNode.addEventListener("submit", handleNewItemSubmit);
avatarEditWindow.formNode.addEventListener("submit", handleEditAvatarSubmit);

profile.avatarNode.addEventListener("click", () => {
  openPopup(avatarEditWindow.popupNode);
  resetPopupValidation(avatarEditWindow.popupNode, validationOptions);
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

function handleLikeClick(event) {
  const currentCard = event.target.closest(".element");
  if (event.target.classList.contains("element__like-button_active")) {
    deleteLike(currentCard.dataset.cardId)
      .then((card) => {
        currentCard.querySelector(".element__likes-count").textContent =
          card.likes.length;
        toggleLike(event);
      })
      .catch((err) => {
        console.error(`Не удалось убрать лайк. ${err}`);
      });
  } else {
    putLike(currentCard.dataset.cardId)
      .then((card) => {
        currentCard.querySelector(".element__likes-count").textContent =
          card.likes.length;
        toggleLike(event);
      })
      .catch((err) => {
        console.error(`Не удалось поставить лайк. ${err}`);
      });
  }
}

function toggleLike(event) {
  event.target.classList.toggle("element__like-button_active");
}

function handleDeleteElement(event) {
  const cardElement = event.target.closest(".element");
  deleteCard(cardElement.dataset.cardId)
    .then(() => {
      event.target.closest(".element").remove();
    })
    .catch((err) => {
      console.error(`Не удалось удалить карточку. ${err}`);
    });
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  changeButtonContent(profileEditWindow.popupNode, "Сохранение...", true);

  setProfile(
    profileEditWindow.nameInputNode.value,
    profileEditWindow.employmentInputNode.value
  )
    .then((profileData) => {
      profile.nameNode.textContent = profileData.name;
      profile.employmentNode.textContent = profileData.about;
      closePopup(profileEditWindow.popupNode);
    })
    .catch((err) => {
      console.error(`Не удалось отредактировать профиль. ${err}`);
    })
    .finally(() => {
      changeButtonContent(profileEditWindow.popupNode, "Сохранить", false);
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
      avatarEditWindow.linkInputNode.value = "";
      closePopup(avatarEditWindow.popupNode);
    })
    .catch((err) => {
      console.error(`Не удалось обновить аватар. ${err}`);
    })
    .finally(() => {
      changeButtonContent(avatarEditWindow.popupNode, "Сохранить", false);
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
      const cardElement = makeNewCard(
        cardData,
        profile.data._id,
        handleImageClick,
        handleLikeClick,
        handleDeleteElement
      );
      elementsList.prepend(cardElement);
      closePopup(newItemWindow.popupNode);
    })
    .catch((err) => {
      console.error(`Не удалось добавить карточку. ${err}`);
    })
    .finally(() => {
      changeButtonContent(newItemWindow.popupNode, "Создать", false);
    });
}

enableValidation(validationOptions);
