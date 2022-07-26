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

const cardTemplate = document.querySelector("#elementTemplate").content;
const elementsList = document.querySelector(".elements__list");
const editProfileButton = document.querySelector("#editProfileButton");
const addNewItemButton = document.querySelector("#addNewItemButton");
const closeProfileButton = document.querySelector("#closeProfileButton");
const closeNewItemButton = document.querySelector("#closeNewItemButton");
const closeImageButton = document.querySelector("#closeImageButton");
const submitProfileButton = document.querySelector("#submitProfileButton");
const submitNewItemButton = document.querySelector("#submitNewItemButton");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupNewItem = document.querySelector("#popupNewItem");
const popupImage = document.querySelector("#popupImage");
const editForm = document.querySelector("#editForm");
const profileName = document.querySelector(".profile__name");
const profileEmployment = document.querySelector(".profile__employment");
const inputProfileName = document.querySelector("#inputProfileName");
const inputProfileEmployment = document.querySelector(
  "#inputProfileEmployment"
);
const inputNewItemName = document.querySelector("#inputNewItemName");
const inputNewItemLink = document.querySelector("#inputNewItemLink");
const itemsList = document.querySelector(".elements__list");

editProfileButton.addEventListener("click", toggleEditProfilePopup);
addNewItemButton.addEventListener("click", toggleNewItemPopup);
closeProfileButton.addEventListener("click", toggleEditProfilePopup);
closeNewItemButton.addEventListener("click", toggleNewItemPopup);
closeImageButton.addEventListener("click", toggleImagePopup);

submitProfileButton.addEventListener("click", handleProfileSubmit);
submitNewItemButton.addEventListener("click", handleNewItemSubmit);
inputProfileName.value = profileName.textContent;
inputProfileEmployment.value = profileEmployment.textContent;

initialCards.forEach((card) => {
  renderCard(card);
});

function toggleEditProfilePopup() {
  popupEditProfile.classList.toggle("popup_opened");
}

function toggleNewItemPopup() {
  popupNewItem.classList.toggle("popup_opened");
}

function toggleImagePopup(event) {
  const currentElement = event.target.closest(".element");
  if (currentElement != null) {
    const imageSrc = currentElement.querySelector(".element__image").src;
    const elementTitle =
      currentElement.querySelector(".element__title").textContent;
    popupImage.querySelector(".popup__figure-image").src = imageSrc;
    popupImage.querySelector(".popup__figure-caption").textContent =
      elementTitle;
  }
  popupImage.classList.toggle("popup_opened");
}

function toggleLike(event) {
    event.target.classList.toggle('element__like-button_active');
}

function handleDeleteElement(event){
  event.target.closest('.element').remove();
}

function handleProfileSubmit(event) {
  event.preventDefault();
  if (inputProfileName.value != "" && inputProfileEmployment.value != "") {
    profileName.textContent = inputProfileName.value;
    profileEmployment.textContent = inputProfileEmployment.value;
    popupEditProfile.classList.toggle("popup_opened");
  }
}

function handleNewItemSubmit(event) {
  event.preventDefault();
  if (inputNewItemName.value != "" && inputNewItemLink.value != "") {
    const card = makeNewCard(inputNewItemName.value, inputNewItemLink.value);
    renderCard(card);
    popupNewItem.classList.toggle("popup_opened");
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
  cardElement.querySelector(".element__like-button").addEventListener('click', toggleLike);
  cardElement.querySelector(".element__delete-button").addEventListener('click', handleDeleteElement);
  elementsList.prepend(cardElement);
}
