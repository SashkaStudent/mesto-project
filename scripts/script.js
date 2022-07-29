const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profile = {
  nameNode: document.querySelector(".profile__name"),
  employmentNode: document.querySelector(".profile__employment"),
  editButtonNode: document.querySelector("#editProfileButton"),
  newItemButtonNode: document.querySelector("#addNewItemButton"),
};

profile.editButtonNode.addEventListener("click", handleEditProfileClick);
profile.newItemButtonNode.addEventListener("click", handleNewItemClick);

const profileEditWindow = {
  popupNode: document.querySelector("#popupEditProfile"),
  nameInputNode: document.querySelector("#inputProfileName"),
  employmentInputNode: document.querySelector("#inputProfileEmployment"),
  formNode: document
    .querySelector("#popupEditProfile")
    .querySelector(".popup__form"),
};

profileEditWindow.formNode.addEventListener("submit", handleEditProfileSubmit);

const newItemWindow = {
  popupNode: document.querySelector("#popupNewItem"),
  nameInputNode: document.querySelector("#inputNewItemName"),
  linkInputNode: document.querySelector("#inputNewItemLink"),
  formNode: document
    .querySelector("#popupNewItem")
    .querySelector(".popup__form"),
};

newItemWindow.formNode.addEventListener("submit", handleNewItemSubmit);

const imageWindow = {
  popupNode: document.querySelector("#popupImage"),
  imageNode: document.querySelector(".popup__figure-image"),
  captionNode: document.querySelector(".popup__figure-caption"),
};

document.querySelectorAll(".popup__close-button").forEach((btn) => {
  const popup = btn.closest('.popup')
  btn.addEventListener("click", () => closePopup(popup));
});

const cardTemplate = document.querySelector("#elementTemplate").content;
const elementsList = document.querySelector(".elements__list");

initialCards.forEach((card) => {
  const cardElement = makeNewCard(card.name, card.link);
  elementsList.prepend(cardElement);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

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

function makeNewCard(name, link) {
  const card = { name: name, link: link };
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementImage.addEventListener("click", handleImageClick);
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", toggleLike);
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleDeleteElement);
  return cardElement;
}
