import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import {
  apiConfig,
  popupImageSelector,
  userInfoSelectors,
  cardSelector,
  cardListSelector,
  popupSelectors,
  validationOptions,
} from "../components/constants.js";
import { handleError } from "../utils/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const api = new Api(apiConfig);
const userInfo = new UserInfo(userInfoSelectors);

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

// const userInfo = new UserInfo(
//   userInfoSelectors,
//   () => {
//     return api.getProfile();
//   },
//   (user) => {
//     return api.setProfile(user);
//   },
//   (linkAvatar) => {
//     return api.updateAvatar(linkAvatar);
//   }
// );

const makeCard = (item, userId) => {
  const card = new Card(
    item,
    cardSelector,
    () => {
      api
        .likeCard(item._id)
        .then((newCard) => {
          card.setLikeBox(newCard.likes);
        })
        .catch(handleError);
    },
    () => {
      api
        .unlikeCard(item._id)
        .then((newCard) => {
          card.setLikeBox(newCard.likes);
        })
        .catch(handleError);
    },
    () => {
      imagePopup.open(item);
    },
    () => {
      api
        .deleteCard(item._id)
        .then(() => {
          card.removeElement();
        })
        .catch(handleError);
    },
    userId
  );
  return card;
};

const cardList = new Section((item) => {
  const card = makeCard(item, userInfo.getUserInfo()._id);
  cardList.addItem(card.generateElement());
}, cardListSelector);

const newCardPopup = new PopupWithForm(
  {
    popupFormSelector: popupSelectors.newCard,
    formSelector: popupSelectors.form,
    submitButtonSelector: popupSelectors.submitButton,
    inputsSelector: popupSelectors.input,
  },
  (cardInfo) => {
    api
      .addNewCard(cardInfo)
      .then((newCard) => {
        cardList.renderNewItem(newCard);
      })
      .catch(handleError)
      .finally(() => newCardPopup.onResponseEnd())
  },
  "Создание..."
);

const editProfilePopup = new PopupWithForm(
  {
    popupFormSelector: popupSelectors.editProfile,
    formSelector: popupSelectors.form,
    submitButtonSelector: popupSelectors.submitButton,
    inputsSelector: popupSelectors.input,
  },
  (profileInfo) =>{
    api
      .setProfile(profileInfo)
      .then((profile) => {
        userInfo.setUserInfo(profile);
        editProfilePopup.close();
      })
      .catch(handleError)
      .finally(()=> editProfilePopup.onResponseEnd())},
  "Сохранение...",
  () => {
    editProfilePopup.setInputsValues(userInfo.getUserInfo());
  }
);

const avatarEditPopup = new PopupWithForm(
  {
    popupFormSelector: popupSelectors.editAvatar,
    formSelector: popupSelectors.form,
    submitButtonSelector: popupSelectors.submitButton,
    inputsSelector: popupSelectors.input,
  },
  (profileInfo) => {
    api.updateAvatar(profileInfo.link)
      .then((profile) => {
        userInfo.setUserInfo(profile);
        avatarEditPopup.close();
      })
      .catch(handleError)
      .finally(()=> avatarEditPopup.onResponseEnd())
  },
  "Сохранение..."
);

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardPopup.open();
});
newCardPopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    editProfilePopup.open();
  });
editProfilePopup.setEventListeners();

document
  .querySelector(".profile__avatar-container")
  .addEventListener("click", () => {
    avatarEditPopup.open();
  });
avatarEditPopup.setEventListeners();

const editProfileValidator = new FormValidator(
  validationOptions,
  editProfilePopup.getFormElement()
);
editProfileValidator.enableValidation();
const newCardValidator = new FormValidator(
  validationOptions,
  newCardPopup.getFormElement()
);
newCardValidator.enableValidation();
const avatarValidator = new FormValidator(
  validationOptions,
  avatarEditPopup.getFormElement()
);
avatarValidator.enableValidation();

Promise.all([api.getProfile(), api.getCards()])
  .then(([user, cards]) => {
    const sortedCards = cards.sort((prevCard, curCard) =>
      prevCard.createdAt > curCard.createdAt ? 1 : -1
    );

    userInfo.setUserInfo(user);
    cardList.setItems(sortedCards);
    cardList.renderItems();
  })
  .catch(handleError);
