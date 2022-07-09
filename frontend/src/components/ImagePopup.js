function ImagePopup(props) {
    return (
        <div className={ props.card ? 'popup popup_darker popup_opened' : 'popup popup_darker' } id='popup-image'>
            <div className='popup__container'>
                <button className='button popup__button-close' type='button' onClick={ props.onClose }></button>
                <img className='popup__image' src={ props.card?.link } alt={ props.card?.name } />
                <p className='popup__image-title'>{ props.card?.name }</p>
            </div>
        </div>
    )
}

export default ImagePopup
