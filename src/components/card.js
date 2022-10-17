const cardTemplate = document.querySelector("#elementTemplate").content;

// Хэндлы handleLike, handleUnlike, handleDeleteCard принимаются в конструкторе?

export class Card {
  constructor(
    { _id, name, likes, link, owner },
    selector,
    handleLike,
    handleUnlike,
    handleCardClick,
    handleDeleteCard,
    profileId
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._selector = selector;

    this._profileId = profileId;

    this._handleLike = handleLike(_id);
    this._handleUnlike = handleUnlike(_id);
    this._handleCardClick = handleCardClick(name, link);
    this._handleDeleteCard = handleDeleteCard(_id);
  }

  _createElement() {
    return document
      .querySelector("#elementTemplate")
      .content.querySelector(this._selector)
      .cloneNode(true);
  }

  generatorElement() {
    const element = this._createElement();

    const name = element.querySelector(".element__title");
    name.textContent = this._name;

    const image = element.querySelector(".element__image");
    image.src = this._link;
    image.alt = this._name;

    const likeContainer = element.querySelector(".element__like-container");

    const likesCount = likeContainer.querySelector(".element__likes-count");
    likesCount.textContent = this._likes.length;

    const like = likeContainer.querySelector(".element__like-button");
    if (this._likes.some((like) => like.owner._id === this._profileId))
      like.classList.add("element__like-button_active");

    const deleteButton = element.querySelector(".element__delete-button");
    if (this._owner._id !== this._profileId)
      deleteButton.classList.add("element__delete-button_disabled");

    this._setEventListeners(image, like, deleteButton);

    return element;
  }

  _setEventListeners(image, like, deleteButton) {
    image.setEventListeners("click", () => {
      this._handleCardClick();
    });

    like.setEventListeners("click", () => {
      like.classList.contains("element__like-button_active")
        ? this._handleUnlike()
        : this._handleLike();
    });

    deleteButton.setEventListeners("click", () => {
      this._handleDeleteCard();
    });
  }
}

export const makeNewCard = (
  card,
  profileId,
  imageClickCallback,
  likeClickCallback,
  deleteClickCallback
) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.dataset.cardId = card._id;
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementImage.addEventListener("click", imageClickCallback);

  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement.querySelector(".element__likes-count").textContent =
    card.likes.length;

  const deleteButton = cardElement.querySelector(".element__delete-button");
  const likeButton = cardElement.querySelector(".element__like-button");
  likeButton.addEventListener("click", likeClickCallback);
  const liked = card.likes.some((like) => {
    return like._id === profileId;
  });
  if (liked) likeButton.classList.add("element__like-button_active");
  if (card.owner._id !== profileId)
    deleteButton.classList.add("element__delete-button_disabled");
  else deleteButton.addEventListener("click", deleteClickCallback);
  return cardElement;
};
