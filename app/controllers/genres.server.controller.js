'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Genre = mongoose.model('Genre'),
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
				message = 'Genre already exists';
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
 * Create a genre
 */
exports.create = function(req, res) {
	var genre = new Genre(req.body);
	genre.user = req.user;

	genre.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(genre, res, function(res, genre){
				res.jsonp(genre);	
			});	
		}
	});
};

/**
 * Show the current genre
 */
exports.read = function(req, res) {
	res.jsonp(req.genre);
};

/**
 * Update a genre
 */
exports.update = function(req, res) {
	var genre = req.genre;

	genre = _.extend(genre, req.body);

	genre.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(genre, res, function(res, genre){
				res.jsonp(genre);	
			});	
		}
	});
};

/**
 * Delete an genre
 */
exports.delete = function(req, res) {
	var genre = req.genre;

	genre.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(genre);
		}
	});
};

/**
 * List of genres
 */
exports.list = function(req, res) {
	Genre.find().sort('-created').populate('user', 'displayName').exec(function(err, genres) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(genres);
		}
	});
};

/**
 * Genre middleware
 */
exports.genreByID = function(req, res, next, id) {
	Genre.findById(id).populate('user', 'displayName').exec(function(err, genre) {
		if (err) return next(err);
		if (!genre) return next(new Error('Failed to load genre ' + id));
		req.genre = genre;
		next();
	});
};

/**
 * Genre authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.genre.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
