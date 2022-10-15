export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRes(res) {
    return res.ok
      ? Promise.resolve(res)
      : Promise.reject(`Ошибка: ${res.status}`);
  }
  _handleJson(res) {
    return res.json();
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  setProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  updateAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar}),
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  unlikeCard(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  likeCard(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleRes);
  }
}
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "e1c7a508-b41b-4183-8776-1689fa2e2758",
    "Content-Type": "application/json",
  },
};

function checkResolve(resolve) {
  return resolve.ok
    ? resolve.json()
    : Promise.reject(`Что-то пошло не так: ${resolve.status}`);
}

function getRequest(path) {
  return fetch(`${config.baseUrl}/${path}`, { headers: config.headers }).then(
    (res) => {
      return checkResolve(res);
    }
  );
}

function postRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResolve(res);
  });
}

function patchRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResolve(res);
  });
}

function putRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResolve(res);
  });
}

function deleteRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    return checkResolve(res);
  });
}

export function getCards() {
  return getRequest("cards");
}

export function getProfile() {
  return getRequest("users/me");
}

export function setProfile(name, employment) {
  return patchRequest("users/me", { name: name, about: employment });
}

export function setAvatar(link) {
  return patchRequest("users/me/avatar", { avatar: link });
}

export function postCard(card) {
  return postRequest("cards", { name: card.name, link: card.link });
}

export function putLike(cardId) {
  return putRequest(`cards/likes/${cardId}`, {});
}

export function deleteCard(cardId) {
  return deleteRequest(`cards/${cardId}`, {});
}

export function deleteLike(cardId) {
  return deleteRequest(`cards/likes/${cardId}`, {});
}
