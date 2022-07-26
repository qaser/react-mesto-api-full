import { apiConfig } from "./constants";


export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  // загрузка данных пользователя
  getMyProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkResponse);
  }


  // редактирование данных пользователя
  editMyProfile({name, occupation}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: occupation,
      }),
    })
        .then(this._checkResponse);
  }


  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
        .then(this._checkResponse);
  }


  // добавление новой карточки
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
        .then(this._checkResponse);
  }


  // удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
        .then(this._checkResponse);
  }


  // отправка запроса на лайк карточки
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
        .then(this._checkResponse);
  }


  // отправка запроса на дизлайк карточки
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
        .then(this._checkResponse);
  }


  // смена аватара
  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
        .then(this._checkResponse);
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

// создание объекта api
export const api = new Api({
    baseUrl: apiConfig.url,
    headers: {
      'authorization': apiConfig.token,
      'Content-Type': 'application/json',
    },
  });
