'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Subregion Schema
 */
var SubregionSchema = new Schema({
	type: {
		type: String,
		default: 'subregion'
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
    pics: [],
    audio: [],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

SubregionSchema.pre('save', function(next) {
    if (this.description)
        this.description = this.sanitizeString(this.description);
    next();
});

/**
 * Create instance method for hashing a password
 */
SubregionSchema.methods.sanitizeString = function(toSanitize) {
    var string = toSanitize.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return string.trim();
};

mongoose.model('Subregion', SubregionSchema);
