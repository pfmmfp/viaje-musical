'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	uploadCtrl = require('../../app/controllers/upload');

module.exports = function(app) {
	// Article Routes
	app.route('/upload')
		.post(users.requiresLogin, uploadCtrl.uploadfile)
};
