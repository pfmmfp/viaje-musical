'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Region = mongoose.model('Region'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Region already exists';
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
 * Create a region
 */
exports.create = function(req, res) {
	var region = new Region(req.body);
	region.user = req.user;

	region.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(region);
		}
	});
};

/**
 * Show the current region
 */
exports.read = function(req, res) {
	res.jsonp(req.region);
};

/**
 * Update a region
 */
exports.update = function(req, res) {
	var region = req.region;

	region = _.extend(region, req.body);

	region.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(region);
		}
	});
};

/**
 * Delete an region
 */
exports.delete = function(req, res) {
	var region = req.region;

	region.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(region);
		}
	});
};

/**
 * List of regions
 */
exports.list = function(req, res) {
	Region.find().sort('-created').populate('user', 'displayName').exec(function(err, regions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(regions);
		}
	});
};

/**
 * Region middleware
 */
exports.regionByID = function(req, res, next, id) {
	Region.findById(id).populate('user', 'displayName').exec(function(err, region) {
		if (err) return next(err);
		if (!region) return next(new Error('Failed to load region ' + id));
		req.region = region;
		next();
	});
};

/**
 * Region authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.region.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
