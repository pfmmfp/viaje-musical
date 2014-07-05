'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	subregions = require('../../app/controllers/subregions');

module.exports = function(app) {
	// Article Routes
	app.route('/subregions')
		.get(subregions.list)
		.post(users.requiresLogin, subregions.create);

	app.route('/subregions/:subregionId')
		.get(subregions.read)
		.put(users.requiresLogin, subregions.hasAuthorization, subregions.update)
		.delete(users.requiresLogin, subregions.hasAuthorization, subregions.delete);

	// Finish by binding the subregion middleware
	app.param('subregionId', subregions.subregionByID);
};
