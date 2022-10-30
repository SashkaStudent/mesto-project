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
import { handleError } from "../components/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const api = new Api(apiConfig);
const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo(
  userInfoSelectors,
  () => {
    return api.getProfile();
  },
  (user) => {
    return api.setProfile(user);
  },
  (linkAvatar) => {
    return api.updateAvatar(linkAvatar);
  }
);

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
}

const makeSection = (cards, userId) => {
  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = makeCard(item, userId);
        cardList.addItem(card.generateElement());
      },
    },
    cardListSelector
  );
  return cardList;
}

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {

    const sortedCards = cards.sort((prevCard, curCard) =>
      prevCard.createdAt > curCard.createdAt ? 1 : -1
    );

    const cardList = makeSection(sortedCards, user._id);
    cardList.renderItems();

    const newCardPopup = new PopupWithForm(
      {
        popupFormSelector: popupSelectors.newCard,
        formSelector: popupSelectors.form,
        submitButtonSelector: popupSelectors.submitButton,
        inputsSelector: popupSelectors.input,
      },
      (cardInfo) => {
        return api
          .addNewCard(cardInfo)
          .then((newCard) => {
            cardList.renderNewItem(newCard);
          })
          .catch(handleError).finally(() => {
          });
      }, 'Создание...'
    );

    const editProfilePopup = new PopupWithForm(
      {
        popupFormSelector: popupSelectors.editProfile,
        formSelector: popupSelectors.form,
        submitButtonSelector: popupSelectors.submitButton,
        inputsSelector: popupSelectors.input,
      },
      (profileInfo) => {
        return userInfo.setUserInfo(profileInfo)
      }, 'Сохранение...',
      () => {
        editProfilePopup.setInputsValues(userInfo.getUserInfoFromElements())
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
        return userInfo.updateAvatar(profileInfo.link);
      }, 'Сохранение...'
    );

    document
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
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

    const editProfileValidator = new FormValidator(validationOptions, editProfilePopup.getFormElement());
    editProfileValidator.enableValidation();
    const newCardValidator = new FormValidator(validationOptions, newCardPopup.getFormElement());
    newCardValidator.enableValidation();
    const avatarValidator = new FormValidator(validationOptions, avatarEditPopup.getFormElement());
    avatarValidator.enableValidation();
  })
  .catch(handleError);
