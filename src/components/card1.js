const cardTemplate = document.querySelector("#elementTemplate").content;

// Хэндлы handleLike, handleUnlike, handleDeleteCard принимаются в конструкторе?


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
