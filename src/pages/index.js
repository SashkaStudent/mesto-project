import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import { apiConfig, popupImageSelector } from "../components/constants.js";
import { handleError } from "../components/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

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
// api.getProfile().then((profile) => { console.log(profile) });
// "c760c75db1ab96b55fc75d1e"

// api.addNewCard({
//   name: "Для удаления",
//   link: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
// });

api.getCards().then((cards) => {
  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = new Card(
          item,
          ".element",
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
          "c760c75db1ab96b55fc75d1e"
        );
        cardList.addItem(card.generateElement());
      },
    },
    ".elements__list" // Файл constants.js
  );
  cardList.renderItems();
});

//getProfile().then(initProfile);
//.then(initCards).catch(err => { console.error(`Не удалось загрузить профиль. ${err}`) });
