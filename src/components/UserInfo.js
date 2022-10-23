export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}){
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this._nameElement.textContent = "1234";

  }  
}