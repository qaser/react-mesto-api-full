const router = require('express').Router();
const {
  userAvatarValid,
  parameterIdValid,
  userValid,
} = require('../middlewares/validationJoi');

const {
  getUsers,
  getUserById,
  getUserMe,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', parameterIdValid('userId'), getUserById);
router.patch('/me', userValid, updateUser);
router.patch('/me/avatar', userAvatarValid, updateUserAvatar);

module.exports = router;
