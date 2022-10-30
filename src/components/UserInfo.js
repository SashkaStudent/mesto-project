export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, getUserFromApi, setUserFromApi, updateAvatarFromApi) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._getUserFromApi = getUserFromApi;
    this._setUserFromApi = setUserFromApi;
    this._updateAvatarFromApi = updateAvatarFromApi;
  }

  _setUserOnPage({ _id, name, about, avatar }) {
    this._id = _id;
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return (this._getUserFromApi()).then(userData => {
      this._setUserOnPage(userData);
      return userData;
    })
  }

  getUserInfoFromElements() {

    return { name: this._nameElement.textContent, about: this._aboutElement.textContent };
  }

  setUserInfo({ name, about }) {
    return (this._setUserFromApi({ name, about })).then(userData => {
      this._setUserOnPage(userData);
    })
  }

  updateAvatar(avatarLink) {
    return (this._updateAvatarFromApi(avatarLink)).then(userData => {
      this._setUserOnPage(userData);
    });
  }
}
