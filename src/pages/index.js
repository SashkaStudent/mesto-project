// To do list:
// [ ] Избавиться от чрезмерной вложенности в Promise.all
// [ ] Настроить webpack, devserver в частности
// [ ] Вынести проверку статуса ответа сервера в отдельную функцию 
//     https://files.slack.com/files-pri/TPV9DP0N4-F048AQB7WM9/image.png
// [ ] Убрать лишние файлы
// [ ] Почистить от комментов
// [ ] Поискать что можно вынести в константы во всех классах
// [ ] 

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

// const profile = {
//   data: {},
//   nameNode: document.querySelector(".profile__name"),
//   avatarNode: document.querySelector(".profile__avatar-container"),
//   avatarImageNode: document.querySelector(".profile__avatar"),
//   employmentNode: document.querySelector(".profile__employment"),
//   editButtonNode: document.querySelector("#editProfileButton"),
//   newItemButtonNode: document.querySelector("#addNewItemButton"),
// };

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

Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    const cardList = new Section(
      {
        items: cards.sort((prevCard, curCard) =>
          prevCard.createdAt > curCard.createdAt ? 1 : -1
        ),
        renderer: (item) => {
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
            user._id
          );

          cardList.addItem(card.generateElement());
        },
      },
      cardListSelector
    );
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
          .catch(handleError).finally(()=>{
          });
      }, {actionText:'Создать', inProgressText: 'Создание...'}
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
      }, {actionText:'Сохранить', inProgressText: 'Сохранение...'}
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
      }, {actionText:'Сохранить', inProgressText: 'Сохранение...'}
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

// api.getProfile().then((profile) => { console.log(profile) });
// "c760c75db1ab96b55fc75d1e"

// api.addNewCard({
//   name: "Для удаления",
//   link: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
// });

//getProfile().then(initProfile);
//.then(initCards).catch(err => { console.error(`Не удалось загрузить профиль. ${err}`) });
