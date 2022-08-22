import { apiConfig } from "./constants";


export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }


  // загрузка данных пользователя
  getMyProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            credentials: true
          },
    })
    .then(this._checkResponse);
  }


  // редактирование данных пользователя
  editMyProfile({name, occupation}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
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
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            credentials: true
          },
    })
      .then(this._checkResponse)
  }


  // добавление новой карточки
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
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
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
    })
        .then(this._checkResponse);
  }


  // отправка запроса на лайк карточки
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
    })
        .then(this._checkResponse);
  }


  // отправка запроса на дизлайк карточки
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
    })
        .then(this._checkResponse);
  }


  // смена аватара
  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        credentials: true
      },
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
export const api = new Api(apiConfig.url);
