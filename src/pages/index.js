import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import { apiConfig, popupImageSelector, userInfoSelectors, cardSelector, cardListSelector } from "../components/constants.js";
import { handleError } from "../components/utils.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

const userInfo = new UserInfo(userInfoSelectors,
  () => { return api.getProfile() },
  (user) => { return api.setProfile(user) },
  (linkAvatar) => { return api.updateAvatar(linkAvatar) }
);

Promise.all([userInfo.getUserInfo(), api.getCards()]).then(([user, cards]) => {
  const cardList = new Section(
    {
      items: cards,
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
    cardListSelector // Файл constants.js
  );
  cardList.renderItems();
}).catch(handleError)

// api.getProfile().then((profile) => { console.log(profile) });
// "c760c75db1ab96b55fc75d1e"

// api.addNewCard({
//   name: "Для удаления",
//   link: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
// });

api.getCards().then((cards) => {

});

//getProfile().then(initProfile);
//.then(initCards).catch(err => { console.error(`Не удалось загрузить профиль. ${err}`) });
