'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Subregion = mongoose.model('Subregion'),
	_ = require('lodash');

var uploadCtrl = require('./upload.server.controller.js');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Subregion already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a subregion
 */
exports.create = function(req, res) {
	var subregion = new Subregion(req.body);
	subregion.user = req.user;

	subregion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(subregion, res, function(res, subregion){});	
			return res.jsonp(subregion);
		}
	});
};

/**
 * Show the current subregion
 */
exports.read = function(req, res) {
	res.jsonp(req.subregion);
};

/**
 * Update a subregion
 */
exports.update = function(req, res) {
	var subregion = req.subregion;

	subregion = _.extend(subregion, req.body);

	subregion.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(subregion, res, function(res, subregion){});	
			return res.jsonp(subregion);
		}
	});
};

/**
 * Delete an subregion
 */
exports.delete = function(req, res) {
	var subregion = req.subregion;

	subregion.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subregion);
		}
	});
};

/**
 * List of subregions
 */
exports.list = function(req, res) {
	Subregion.find().sort('-created').populate('user', 'displayName').exec(function(err, subregions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subregions);
		}
	});
};

/**
 * Subregion middleware
 */
exports.subregionByID = function(req, res, next, id) {
	Subregion.findById(id).populate('user', 'displayName').exec(function(err, subregion) {
		if (err) return next(err);
		if (!subregion) return next(new Error('Failed to load subregion ' + id));
		req.subregion = subregion;
		next();
	});
};

/**
 * Subregion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.subregion.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
