import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import { apiConfig } from "../components/constants.js";

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

// api.getProfile().then((profile) => { console.log(profile) });
// "c760c75db1ab96b55fc75d1e"

api.getCards()
  .then((cards) => {
    const cardList = new Section({
      items: cards,
      renderer: (item) => {

        const card = new Card(
          item,
          '.element',
          () => { return api.likeCard(card._id) }, // При простой передаче api.likeCard, _baseUrl = undefined
          () => { },
          () => { },
          () => { },
          "c760c75db1ab96b55fc75d1e"
        );
        cardList.addItem(card.generateElement());
      }
    },
      '.elements__list' // Файл constants.js
    )
    cardList.renderItems();
  });

//getProfile().then(initProfile);
//.then(initCards).catch(err => { console.error(`Не удалось загрузить профиль. ${err}`) });
