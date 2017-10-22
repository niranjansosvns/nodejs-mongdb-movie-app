var Movie = require('../models/movie');

function findByImdbId(id, callback) {
    Movie.findOne({imdbId: id}, callback);
}

function findAll(callback) {
    Movie.find({}, callback);
}

function insert(obj, callback) {
    var movie = new Movie(obj);
    // persist model
    movie.save(callback);
}

function update(id, obj, callback) {
    Movie.findOneAndUpdate({imdbId: id}, obj, {new: true}, callback);
}

function remove(id, callback) {
    Movie.findOneAndRemove({imdbId: id}, callback);
}

// export repository object
module.exports = {
    findByImdbId: findByImdbId,
    findAll: findAll,
    insert: insert,
    update: update,
    remove: remove
};