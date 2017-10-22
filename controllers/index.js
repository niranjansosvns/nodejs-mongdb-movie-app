var moviesRepository = require('../repositories/movies');

// export controllers object
module.exports = {
    home: require('./home')(),
    movies: require('./movies')(moviesRepository)
};