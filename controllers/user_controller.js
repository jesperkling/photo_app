/**
 * User Controller
 */

const debug = require('debug')('photo_app:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
const bcrypt = require('bcrypt');


/**
 * Register user
 *
 * POST /
 */
const register = async (req, res) => {
	const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        });
    }

    const validData = matchedData(req);

    try {
        validData.password = await bcrypt.hash(validData.password, 10);

    } catch (error) {
        res.status(500).send({
            status: 'error',
      		message: 'Exception thrown when hashing the password.',
        });
        throw error;
    }

    try {
        const user = await new models.User(validData).save();

        res.status(200).send({
            status: 'success',
            data: {
                email: validData.email,
                first_name: validData.first_name,
                last_name: validData.last_name
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when registering a new user.'
        });
        throw error;
    }
}

/**
 * Login user
 *
 * POST
 */
const login = async (req, res) => {
	const email = req.body.email;
    const password = req.body.password;

    const user = await models.User.login(email, password);

    if (!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Could not login'
        });
    }

    return res.status(200).send({
        status: 'success',
        data: user
    });
}

module.exports = {
	register,
    login,
}
