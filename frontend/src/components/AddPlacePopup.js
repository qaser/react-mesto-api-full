import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        props.addPlace({name, link});
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name='add-place'
            title='Новое место'
            isOpen={ props.isOpen }
            onClose={ props.onClose }
            titleButton='Создать'
            onSubmit={ handleAddPlaceSubmit }
        >
            <>
                <label className="form__field">
                    <input
                        className="form__input"
                        id="place-name"
                        type="text"
                        name="place"
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        onChange={ handleNameChange }
                        value={ name }
                        required
                    />
                    <span className="form__input-error" id="place-name-error"></span>
                </label>
                <label className="form__field">
                    <input
                        className="form__input"
                        id="place-link"
                        type="url"
                        name="link"
                        placeholder="Ссылка на картинку"
                        onChange={ handleLinkChange }
                        value={ link }
                        required
                    />
                    <span className="form__input-error" id="place-link-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup
