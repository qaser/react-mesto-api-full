import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `button button_high-transparent places__basket ${isOwn && 'places__basket_active'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `button button_high-transparent places__like ${isLiked ? 'places__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className='places__item' id={ props.card._id }>
            <button className={ cardDeleteButtonClassName } type='button' onClick={ handleDeleteClick }></button>
            <img className='places__image' onClick={ handleClick } src={ props.card.link } alt={ props.card.name } />
            <div className='places__footer'>
                <h3 className='places__name'>{ props.card.name }</h3>
                <div className='places__like-area'>
                    <button className={ cardLikeButtonClassName } type='button' onClick={ handleLikeClick }></button>
                    <h3 className='places__like-count'>{ props.card.likes.length }</h3>
                </div>
            </div>
        </li>
    )
}

export default Card
