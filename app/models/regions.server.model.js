'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Region Schema
 */
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
	pic: {
        type: String,
        default: '',
        trim: true
    },
    genres: [],	
    subregions: [],	
    instruments: [],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Region', RegionSchema);
