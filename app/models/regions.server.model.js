'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Region Schema
 */
var MediaSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	ext: {
		type: String,
		default: ''
	}
});

var RegionSchema = new Schema({
    type: {
		type: String,
		default: 'region'
	},
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    family: {
        type: String,
        default: '',
        trim: true
    },
    instruments: [],
    pics: [],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Region', RegionSchema);
