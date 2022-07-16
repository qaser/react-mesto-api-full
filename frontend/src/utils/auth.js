import { apiConfig } from "./constants";

class Auth {
    constructor(address) {
        this._address = address;
    }
    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
    }

    registration({email, password}) {
        return fetch(`${this._address}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password})
        })
        .then(this._handleResponse);
    }

    authorization({email, password}) {
        return fetch(`${this._address}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(this._handleResponse);
    }

    checkToken(token) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(this._handleResponse);
    }
}
const auth = new Auth(apiConfig.url);
export default auth;
