const router = require('express').Router();
const {
  createCardValid,
  parameterIdValid,
} = require('../middlewares/validationJoi');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardValid, createCard);
router.delete('/:cardId', parameterIdValid('cardId'), deleteCard);
router.put('/:cardId/likes', parameterIdValid('cardId'), likeCard);
router.delete('/:cardId/likes', parameterIdValid('cardId'), dislikeCard);

module.exports = router;
