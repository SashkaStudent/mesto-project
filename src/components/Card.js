export default class Card {
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
    this._handleLike = handleLike;//(_id);
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

  generateElement() {
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

    if (this._likes.some((l) => { l._id === this._profileId; })) //Ошибка была здесь в some передавали like, который объявлен выше
      like.classList.add("element__like-button_active");         // У лайка нет поля owner, но есть _id

    const deleteButton = element.querySelector(".element__delete-button");
    if (this._owner._id !== this._profileId)
      deleteButton.classList.add("element__delete-button_disabled");

    this._setEventListeners(image, like, deleteButton);

    return element;
  }

  _setEventListeners(image, like, deleteButton) {
    // Здесь вместо addEventListener был setEventListeners
    image.addEventListener("click", () => {
      this._handleCardClick();
    });

    like.addEventListener("click", () => {
      like.classList.contains("element__like-button_active")
        ? this._handleUnlike()
        : this._handleLike(this._id);
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }
}
