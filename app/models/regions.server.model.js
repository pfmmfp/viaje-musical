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

RegionSchema.pre('save', function(next) {
    if (this.description)
        this.description = this.sanitizeString(this.description);
    next();
});

/**
 * Create instance method for hashing a password
 */
RegionSchema.methods.sanitizeString = function(toSanitize) {
    var string = toSanitize.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return string.trim();
};

mongoose.model('Region', RegionSchema);
