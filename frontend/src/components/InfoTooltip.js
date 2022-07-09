import React from 'react';

function InfoToolTip(props) {
    return (
        <div className={ props.isOpen ? 'popup popup_darker popup_opened' : 'popup popup_darker' } id='infotooltip'>
            <div className='popup__container'>
                <button className='button popup__button-close' type='button' onClick={ props.onClose }></button>
                <div className='tooltip'>
                    <img className='tooltip__image' alt={props.messageTooltip.message} src={props.messageTooltip.img} />
                    <h2 className='tooltip__text'>{props.messageTooltip.message}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip;
