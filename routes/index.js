const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'We now have a connection' }});
});

router.use('/album', auth.basic, require('./albums'));
router.use('/photo', auth.basic, require('./photos'));
router.post('/register', userValidationRules.createRules, userController.register);

module.exports = router;
