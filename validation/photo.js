/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create Photo validation rules
 *
 */
const createRules = [
	body('title').exists().isLength({ min: 4 }),
    body('url').exists().isURL(),
    body('comment').optional(),
];

/**
 * Update Photo validation rules
 *
 */
const updateRules = [
	body('title').optional().isLength({ min: 4 }),
    body('url').exists().isURL(),
    body('comment').optional(),
];

module.exports = {
	createRules,
	updateRules,
}
