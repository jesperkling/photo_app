/**
 * Album Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create Album validation rules
 *
 */
const createRules = [
	body('title').exists().isLength({ min: 4 }),
];

/**
 * Update Example validation rules
 *
 */
const updateRules = [
	body('title').optional().isLength({ min: 4 }),
];

/**
 * Add Photo to Album Validation Rules
 * 
 */
const addPhotoRules = [
    body('photo_id').exists().isInt(),
];

module.exports = {
	createRules,
	updateRules,
    addPhotoRules,
}
