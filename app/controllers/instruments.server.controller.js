'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Instrument = mongoose.model('Instrument'),
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
				message = 'Instrument already exists';
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
 * Create a instrument
 */
exports.create = function(req, res) {
	var instrument = new Instrument(req.body);
	instrument.user = req.user;

	instrument.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(instrument, res, function(res, instrument){
				res.jsonp(instrument);	
			});	
		}
	});
};

/**
 * Show the current instrument
 */
exports.read = function(req, res) {
	res.jsonp(req.instrument);
};

/**
 * Update a instrument
 */
exports.update = function(req, res) {
	var instrument = req.instrument;

	instrument = _.extend(instrument, req.body);

	instrument.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			uploadCtrl.saveModelFiles(instrument, res, function(res, instrument){
				res.jsonp(instrument);	
			});	
		}
	});
};

/**
 * Delete an instrument
 */
exports.delete = function(req, res) {
	var instrument = req.instrument;

	instrument.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(instrument);
		}
	});
};

/**
 * List of instruments
 */
exports.list = function(req, res) {
	var query = Instrument.find();
	if ( req.query.by )
	{
		query.where( req.query.by );
	}

	if ( req.query.$in )
	{
		query.where("_id").in( req.query.$in );
	}

	query.sort('-created').populate('user', 'displayName');
	
	query.exec(function(err, instruments) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(instruments);
		}
	});
};

/**
 * Instrument middleware
 */
exports.instrumentByID = function(req, res, next, id) {
	Instrument.findById(id).populate('user', 'displayName').exec(function(err, instrument) {
		if (err) return next(err);
		if (!instrument) return next(new Error('Failed to load instrument ' + id));
		req.instrument = instrument;
		next();
	});
};

/**
 * Instrument authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.instrument.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};
