const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "e1c7a508-b41b-4183-8776-1689fa2e2758",
    "Content-Type": "application/json",
  },
};
function getRequest(path) {
  return fetch(`${config.baseUrl}/${path}`, { headers: config.headers }).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    }
  );
}

function postRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  });
}

function patchRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  });
}

function putRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  });
}

function deleteRequest(path, body) {
  return fetch(`${config.baseUrl}/${path}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
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