'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Instrument Schema
 */
var InstrumentSchema = new Schema({
	type: {
		type: String,
		default: 'instrument'
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

InstrumentSchema.pre('save', function(next) {
    if (this.description)
        this.description = this.sanitizeString(this.description);
    next();
});

/**
 * Create instance method for hashing a password
 */
InstrumentSchema.methods.sanitizeString = function(toSanitize) {
    var string = toSanitize.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return string.trim();
};

mongoose.model('Instrument', InstrumentSchema);

