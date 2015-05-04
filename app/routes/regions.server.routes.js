'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	regions = require('../../app/controllers/regions');

module.exports = function(app) {
	// Article Routes
	
	app.route('/regions')
		.get(regions.list)
		.post(users.requiresLogin, regions.create);
	
	app.route('/admin/regions')
		.get(regions.list)
		.post(users.requiresLogin, regions.create);

	app.route('/regions/:regionName')
		.get(regions.read)
		.put(users.requiresLogin, regions.hasAuthorization, regions.update)
		.delete(users.requiresLogin, regions.hasAuthorization, regions.delete);


	app.route('/admin/regions/:regionId')
		.get(regions.read)
		.put(users.requiresLogin, regions.hasAuthorization, regions.update)
		.delete(users.requiresLogin, regions.hasAuthorization, regions.delete);

	// Finish by binding the region middleware
	app.param('regionId', regions.regionByID);
	app.param('regionName', regions.regionByName);
};
