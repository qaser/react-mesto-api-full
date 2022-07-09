import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [occupation, setOccupation] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleOccupationChange(e) {
        setOccupation(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: occupation,
        });
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setOccupation(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            onSubmit={ handleSubmit }
            name='edit-user'
            title='Редактировать профиль'
            titleButton='Сохранить'
        >
            <label className="form__field">
                <input
                    className="form__input"
                    id="user-name"
                    onChange={ handleNameChange }
                    value={ name }
                    type="text"
                    name="name"
                    placeholder="Имя пользователя"
                    required minLength="2"
                    maxLength="40"
                />
                <span className="form__input-error" id="user-name-error"></span>
            </label>
            <label className="form__field">
                <input
                    className="form__input"
                    id="user-occupation"
                    onChange={ handleOccupationChange }
                    value={ occupation }
                    type="text"
                    name="occupation"
                    placeholder="О себе"
                    required minLength="2"
                    maxLength="200"
                />
                <span className="form__input-error" id="user-occupation-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup
