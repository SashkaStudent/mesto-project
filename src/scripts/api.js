export function getCards(apiOptions){
  return fetch(`https://nomoreparties.co/v1/${apiOptions.group}/cards`, {
  headers: {
    authorization: apiOptions.token
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
}

export function getProfile(apiOptions){
  return fetch(`https://nomoreparties.co/v1/${apiOptions.group}/users/me`, {
    headers: {
      authorization: apiOptions.token
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    }); 
}