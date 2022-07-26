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

profile.editButtonNode.addEventListener("click", toggleEditProfilePopup);
profile.newItemButtonNode.addEventListener("click", toggleNewItemPopup);

const profileEditWindow = {
  popupNode: document.querySelector("#popupEditProfile"),
  nameInputNode: document.querySelector("#inputProfileName"),
  employmentInputNode: document.querySelector("#inputProfileEmployment"),
  closeButtonNode: document.querySelector("#closeProfileButton"),
  submitButtonNode: document.querySelector("#submitProfileButton"),
};

profileEditWindow.closeButtonNode.addEventListener(
  "click",
  toggleEditProfilePopup
);
profileEditWindow.submitButtonNode.addEventListener(
  "click",
  handleEditProfileSubmit
);

const newItemWindow = {
  popupNode: document.querySelector("#popupNewItem"),
  nameInputNode: document.querySelector("#inputNewItemName"),
  linkInputNode: document.querySelector("#inputNewItemLink"),
  closeButtonNode: document.querySelector("#closeNewItemButton"),
  submitButtonNode: document.querySelector("#submitNewItemButton"),
};

newItemWindow.closeButtonNode.addEventListener("click", toggleNewItemPopup);
newItemWindow.submitButtonNode.addEventListener("click", handleNewItemSubmit);

const imageWindow = {
  popupNode: document.querySelector("#popupImage"),
  imageNode: document.querySelector(".popup__figure-image"),
  captionNode: document.querySelector(".popup__figure-caption"),
  closeButtonNode: document.querySelector("#closeImageButton"),
};

imageWindow.closeButtonNode.addEventListener("click", toggleImagePopup);

const cardTemplate = document.querySelector("#elementTemplate").content;
const elementsList = document.querySelector(".elements__list");

initialCards.forEach((card) => {
  renderCard(card);
});

function toggleEditProfilePopup() {
  profileEditWindow.nameInputNode.value = profile.nameNode.textContent;
  profileEditWindow.employmentInputNode.value =
    profile.employmentNode.textContent;
  popupEditProfile.classList.toggle("popup_opened");
}

function toggleNewItemPopup() {
  newItemWindow.nameInputNode.value = '';
  newItemWindow.linkInputNode.value = '';
  newItemWindow.popupNode.classList.toggle("popup_opened");
}

function toggleImagePopup(event) {
  const currentElement = event.target.closest(".element");
  if (currentElement != null) {
    const imageSrc = currentElement.querySelector(".element__image").src;
    const elementTitle =
      currentElement.querySelector(".element__title").textContent;
    imageWindow.imageNode.src = imageSrc;
    imageWindow.captionNode.textContent = elementTitle;
  }
  imageWindow.popupNode.classList.toggle("popup_opened");
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
    profile.employmentNode.textContent = profileEditWindow.employmentInputNode.value;
    toggleEditProfilePopup();
  }
}

function handleNewItemSubmit(event) {
  event.preventDefault();
  if (newItemWindow.nameInputNode.value != "" && newItemWindow.linkInputNode.value != "") {
    const card = makeNewCard(newItemWindow.nameInputNode.value, newItemWindow.linkInputNode.value);
    renderCard(card);
    toggleNewItemPopup();
  }
}

function makeNewCard(name, link) {
  const card = { name: name, link: link };
  return card;
}

function renderCard(card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = card.link;
  elementImage.addEventListener("click", toggleImagePopup);
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", toggleLike);
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleDeleteElement);
  elementsList.prepend(cardElement);
}
