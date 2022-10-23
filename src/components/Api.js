
export default class Api {
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

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleRes)
      .then(this._handleJson);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleRes);
  }
}

