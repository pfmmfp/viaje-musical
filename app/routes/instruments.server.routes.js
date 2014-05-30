'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	instruments = require('../../app/controllers/instruments');

module.exports = function(app) {
	// Article Routes
	app.route('/instruments')
		.get(instruments.list)
		.post(users.requiresLogin, instruments.create);

	app.route('/instruments/:instrumentId')
		.get(instruments.read)
		.put(users.requiresLogin, instruments.hasAuthorization, instruments.update)
		.delete(users.requiresLogin, instruments.hasAuthorization, instruments.delete);

	// Finish by binding the instrument middleware
	app.param('instrumentId', instruments.instrumentByID);
};
