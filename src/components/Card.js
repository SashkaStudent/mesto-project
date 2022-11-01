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
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _createElement() {
    this._element = document
      .querySelector("#elementTemplate")
      .content.querySelector(this._selector)
      .cloneNode(true);
  }

  setLikeBox(likes) {
    this._likesCount.textContent = likes.length;
    if (likes.some((likeItem) => likeItem._id === this._profileId)) {
      this._like.classList.add("element__like-button_active"); // У лайка нет поля owner, но есть _id
    } else {
      this._like.classList.remove("element__like-button_active");
    }
  }

  generateElement() {
    this._createElement();

    const name = this._element.querySelector(".element__title");
    name.textContent = this._name;

    const image = this._element.querySelector(".element__image");
    image.src = this._link;
    image.alt = this._name;

    this._likeContainer = this._element.querySelector(
      ".element__like-container"
    );
    this._likesCount = this._likeContainer.querySelector(".element__likes-count");
    this._like = this._likeContainer.querySelector(".element__like-button");
    this.setLikeBox(this._likes);

    this._deleteButton = this._element.querySelector(".element__delete-button");
    if (this._owner._id !== this._profileId)
      this._deleteButton.classList.add("element__delete-button_disabled");

    this._setEventListeners(image, this._like, this._deleteButton);

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners(image, like, deleteButton) {
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
