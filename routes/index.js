const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'We now have a connection' }});
});

router.use('/album', require('./album'));
router.use('/photo', require('./photo'));
router.post('/register', userValidationRules.createRules, userController.register);

module.exports = router;
