function PopupWithForm(props) {
    return (
        <div className={ `popup ${ props.isOpen ? "popup_opened" : "" }` } id='popup-profile'>
            <div className='popup__container'>
                <button className='button popup__button-close' type='button' onClick={ props.onClose }></button>
                <form className='form' name={ props.name } id='form-profile' onSubmit={ props.onSubmit }>
                    <h2 className='form__header'>{ props.title }</h2>
                    { props.children }
                    <button className='button button_low-transparent form__button' type='submit'>
                        { props.titleButton }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm
