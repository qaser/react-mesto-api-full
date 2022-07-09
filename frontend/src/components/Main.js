import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className='content'>
            <section className='profile'>
                <div className='profile__user'>
                    <button className='profile__button-avatar' type='button' onClick={ props.onEditAvatar }>
                    <img className='profile__avatar' src={ currentUser?.avatar } alt='Аватар пользователя' />
                    </button>
                    <div className='profile__description'>
                    <div className='intro'>
                        <h1 className='intro__user-name'>{ currentUser?.name}</h1>
                        <button className='button intro__edit-button' type='button' onClick={ props.onEditProfile }></button>
                    </div>
                    <p className='profile__occupation'>{ currentUser?.about }</p>
                    </div>
                </div>
                <button className='button profile__button' type='button' onClick={ props.onAddPlace }></button>
            </section>

            <section className='places'>
                <ul className='list places__items'>
                    { props.cards.map(( card ) => {
                        return (
                            <Card
                                card={ card }
                                // вот здесь обработчик открытия уходит на карточку
                                onCardClick={ props.onCardClick }
                                onCardLike={ props.onCardLike }
                                onCardDelete={ props.onCardDelete }
                                key={ card._id } // сделал чтобы ушла ошибка 'уникальный ключ для карточки'
                            />
                        )
                    })}
                </ul>
            </section>
      </main>
    );
}

export default Main
