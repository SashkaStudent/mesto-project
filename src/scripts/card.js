

const cardTemplate = document.querySelector("#elementTemplate").content;


export const makeNewCard = (card, isForeign) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.dataset.cardId = card._id;
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement.querySelector(".element__likes-count").textContent = card.likes.length;
  const deleteButton = cardElement.querySelector(".element__delete-button");
  if(isForeign) deleteButton.classList.add('element__delete-button_disabled');
  return cardElement;
}


