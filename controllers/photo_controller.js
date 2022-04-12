/**
 * Photo Controller
 */

const debug = require('debug')('photo_app:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all photos
 *
 * GET /
 */
const index = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['photos'] });

	res.status(200).send({
		status: 'success',
		data: {
            photos: user.related('photos')
        }
	});
}

/**
 * Get a specific photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['photos'] });

    const photos = user.related('photos').find(photo => photo.id == req.params.photoId);

    if (!photos) {
        return res.status(404).send({
            status: 'fail',
            message: 'Photo could not be found'
        });
    }

    const photoId = await models.Photo.fetchById(req.params.photoId);

	res.status(200).send({
		status: 'success',
		data: {
            photos: photoId
        }
	});
}

/**
 * Store a new photo
 *
 * POST /
 */
const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
    validData.user_id = req.user.id;

	try {
		const photo = await new models.Photo(validData).save();
		debug("Created new photo successfully: %O", photo);

		res.status(200).send({
			status: 'success',
			data: {
                photo
            }
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new photo.',
		});
		throw error;
	}
}

/**
 * Update a specific photo
 *
 * PUT /:photoId
 */
const update = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['photos'] });

    const photo = user.related('photos').find(photo => photo.id == req.params.photoId);

    const photoId = await models.Photo.fetchById(req.params.photoId);
    
	if (!photo) {
		debug("Photo to update was not found. %o", { id: photoId });
		res.status(404).send({
			status: 'fail',
			data: 'Photo Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedPhoto = await photo.save(validData);
		
		res.status(200).send({
			status: 'success',
			data: {
                updatedPhoto,
            }
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new photo.',
		});
		throw error;
	}
}



module.exports = {
	index,
	show,
	store,
	update,
}
