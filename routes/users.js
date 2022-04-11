const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

/** Register a new user */
router.post('/register', userValidationRules.createRules, userController.register);

module.exports = router;