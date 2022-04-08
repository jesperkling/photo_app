/**
 * User Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create User validation rules
 *
 */
const createRules = [
	body('email').exists().isEmail().custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });
		if (email) {
			return Promise.reject("This email already exists.");
		}
		return Promise.resolve();
	}),
	body('password').exists().isLength({ min: 6 }),
  	body('last_name').exists().isLength({ min: 3 }),
  	body('first_name').exists().isLength({ min: 3 }),
];

/**
 * Update User validation rules
 *
 */
const updateRules = [
	body('password').exists().isLength({ min: 6 }),
  	body('last_name').exists().isLength({ min: 3 }),
  	body('first_name').exists().isLength({ min: 3 }),
];

module.exports = {
	createRules,
	updateRules,
}