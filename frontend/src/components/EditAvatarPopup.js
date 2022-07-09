import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
      }
    );

    return (
        <PopupWithForm
            name='add-avatar'
            title='Обновить аватар'
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            onSubmit={ handleSubmit }
            titleButton='Сохранить'
        >
            <label className="form__field">
                <input
                    className="form__input"
                    id="avatar-link"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    ref={ avatarRef }
                    required
                />
                <span className="form__input-error" id="avatar-link-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
