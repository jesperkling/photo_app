/**
 * Album Controller
 */

const debug = require('debug')('photo_app:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all albums
 *
 * GET /
 */
const index = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });

	res.status(200).send({
		status: 'success',
		data: {
            albums: user.related('albums')
        }
	});
}

/**
 * Get a specific album
 *
 * GET /:albumId
 */
const show = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });

    const album = user.related('albums').find(album => album.id == req.params.albumId);

    if (!album) {
        return res.status(404).send({
            status: 'fail',
            message: 'Album not found.'
        });
    }

    const albumId = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos'] });

	res.status(200).send({
		status: 'success',
		data: {
            albums: albumId
        }
	});
}

/**
 * Store a new album
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
		const album = await new models.Album(validData).save();
		debug("Created new album successfully: %O", album);

		res.status(200).send({
			status: 'success',
			data: {
                album
            }
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
}

/**
 * Update a specific album
 *
 * PUT /:albumId
 */
const update = async (req, res) => {
	const user = await models.User.fetchById(req.user.id, { withRelated: ['albums'] });

    const usersAlbums = user.related('albums');

    const album = usersAlbums.find(album => album.id == req.params.albumId);

	if (!album) {
		debug("Album to update was not found. %o", { id: albumId });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
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
		const updatedAlbum = await album.save(validData);
		debug("Updated album successfully: %O", updatedAlbum);

		res.status(200).send({
			status: 'success',
			data: {
                album
            }
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new album.',
		});
		throw error;
	}
}

/**
 * Add a photo to an album
 *
 * POST /:albumId/photo
 */
const addPhoto = async (req, res) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    const validData = matchedData(req);

    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums', 'photos'] });

    const usersAlbums = user.related('albums').find(album => album.id == req.params.albumId);

    const usersPhotos = user.related('photos').find(photo => photo.id == validData.photo_id);

    const album = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos'] });

    const photoExists = album.related('photos').find(photo => photo.id == validData.photo_id);

    if (photoExists) {
        return res.status(409).send({
            status: 'fail',
            data: 'Photo already exists.'
        });
    }

    if (!usersAlbums) {
        res.status(404).send({
            status: 'fail',
            data: 'Album could not be found.'
        });
        return;
    }

    if (!usersPhotos) {
        res.status(404).send({
            status: 'fail',
            data: 'Photo could not be found.'
        });
    }

    try {
        await album.photos().attach(validData.photo_id);

        res.status(200).send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when adding a photo to an album.'
        });
        throw error;
    }
}

module.exports = {
	index,
	show,
	store,
	update,
    addPhoto,
}
