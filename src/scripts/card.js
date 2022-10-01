

const cardTemplate = document.querySelector("#elementTemplate").content;


export const makeNewCard = (name, link) => {
  const card = { name: name, link: link };
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  cardElement.querySelector(".element__title").textContent = card.name;

  return cardElement;
}


