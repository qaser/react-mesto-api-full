import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoToolTip from './InfoTooltip';
import { Route, useHistory, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth.js';
import successImage from '../images/Successful.svg';
import failImage from '../images/Failed.svg';


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setСurrentUser] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
    const [messageTooltip, setMessageTooltip] = React.useState({});
    const [email, setEmail] = React.useState('');
    const history = useHistory();


    function handleAddPlace({name, link}) {
        api.addNewCard({name, link})
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => `Данные не получены, ошибка: ${ err }`);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (isLiked) {
            api.dislikeCard(card._id)
            .then((newCard) => {
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
            })
            .catch(err => `Данные не получены, ошибка: ${ err }`);
        } else {
            api.likeCard(card._id)
            .then((newCard) => {
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
            })
            .catch(err => `Данные не получены, ошибка: ${ err }`);
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => {
                  return item._id !== card._id;
                }))
            })
            .catch(err => `Данные не получены, ошибка: ${ err }`);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    /** функция закрытия всплывающих окон */
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsTooltipPopupOpen(false);
    }

    function handleUpdateUser(currentUser) {
        api.editMyProfile({name: currentUser.name, occupation: currentUser.about})
            .then((userData) => {
                setСurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => `Данные не получены: ${ err }`);
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((userData) => {
                setСurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => `Данные не получены: ${ err }`);
    }

    React.useEffect(() => {
        Promise.all( [api.getInitialCards(), api.getMyProfile()]).then(([cards, userData ])=>{
            setСurrentUser(userData);
            setCards(cards);
        }).catch(err => `Данные не получены: ${ err }`);

    }, []);

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
            closeAllPopups();
            }
        };
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
    }, [])


    function handleSubmitRegistration(data) {
        auth.registration(data)
            .then((res) => {
                if (res) {
                    history.push('/sign-in')
                    setIsTooltipPopupOpen(true)
                    setMessageTooltip({ message: 'Вы успешно зарегистрировались!', img: successImage })
                }
            })
            .catch((err) => {
                console.log(`Данные не получены: ${ err }`);
                setIsTooltipPopupOpen(true)
                setMessageTooltip({ message: 'Что-то пошло не так! Попробуйте ещё раз.', img: failImage })

            })
      }

    function handleSubmitAuthorization(data) {
        auth.authorization(data)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                setEmail(res.email);
                history.push('/')
            })
            .catch((err) => {
                console.log(`Ошибка: ${ err }`);
                setIsTooltipPopupOpen(true)
                setMessageTooltip({ message: 'Что-то пошло не так! Попробуйте ещё раз.', img: failImage })
            })
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getUser(jwt)
                .then((res) => {
                    if(res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => console.log(`Ошибка: ${ err }`))
            }
    }, [history])


    return (
        <CurrentUserContext.Provider value={ currentUser }>
            <div className='page'>
                <Header
                    email={email}
                    onLogout={handleLogout}
                    loggedIn={loggedIn}
                />
                <Switch>
                    <ProtectedRoute
                        exact
                        path='/'
                        loggedIn={loggedIn}
                        onEditAvatar={ handleEditAvatarClick }
                        onEditProfile={ handleEditProfileClick }
                        onAddPlace={ handleAddPlaceClick }
                        onCardClick={ handleCardClick } // проброс обработчика открытия карточки
                        cards={ cards }
                        onCardLike={ handleCardLike }
                        onCardDelete={ handleCardDelete }
                        component={Main}
                    />
                </Switch>
                { loggedIn && <Footer/>}
                <AddPlacePopup
                    isOpen={ isAddPlacePopupOpen }
                    onClose={ closeAllPopups }
                    addPlace={ handleAddPlace }
                />
                <EditProfilePopup
                    isOpen={ isEditProfilePopupOpen }
                    onClose={ closeAllPopups }
                    onUpdateUser={ handleUpdateUser }
                />
                <EditAvatarPopup
                    isOpen={ isEditAvatarPopupOpen }
                    onClose={ closeAllPopups }
                    onUpdateAvatar={ handleUpdateAvatar }
                />
                <ImagePopup
                    card={ selectedCard }
                    onClose={ closeAllPopups }
                />
                <InfoToolTip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    messageTooltip={messageTooltip}
                />
                <Route path='/sign-up'>
                    <Register onSubmit={handleSubmitRegistration} />
                </Route>
                <Route path='/sign-in'>
                    <Login onSubmit={handleSubmitAuthorization} />
                </Route>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
