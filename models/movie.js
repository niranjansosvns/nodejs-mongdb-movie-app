var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    movieSchema = require('../schemas/movie');

module.exports = mongoose.model('movie', new Schema(movieSchema));