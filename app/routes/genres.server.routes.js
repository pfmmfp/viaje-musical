'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	genres = require('../../app/controllers/genres');

module.exports = function(app) {
	// Article Routes
	app.route('/genres')
		.get(genres.list)
		.post(users.requiresLogin, genres.create);

	app.route('/genres/:genreId')
		.get(genres.read)
		.put(users.requiresLogin, genres.hasAuthorization, genres.update)
		.delete(users.requiresLogin, genres.hasAuthorization, genres.delete);

	// Finish by binding the genre middleware
	app.param('genreId', genres.genreByID);
};
