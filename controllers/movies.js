module.exports = function(movieRepository) {

    'use strict';

    function findAndRenderMovie(imdbId, view, viewModel, res) {
        // asynchronous query
        movieRepository.findByImdbId(imdbId, function(err, movie) {
            if (!movie) {
                view = '404';
            }
            else {
                viewModel.movie = movie;
            }
            // render movie view with the retreived data
            return res.render(view, viewModel);
        });
    }

    // /movies [GET]
    function index(req, res) {
        var view = 'movies/index',
            viewModel = {subTitle: 'All movies'};

        movieRepository.findAll(function(err, movies) {
            if (!movies.length) {
                viewModel.message = 'no movies yet!';
            }
            else {
                viewModel.movies = movies;
            }
            return res.render(view, viewModel);
        });
    }

    // /movies/add [GET]
    function viewAddForm(req, res) {
        return res.render('movies/add', {subTitle: 'Add Movie'});
    }

    // /movies/add [POST]
    function add(req, res) {
        var view = 'movies/add',
            viewModel = {subTitle: 'Add Movie'},
            movieObj = req.body;

        // verify that imdb id doesnt exist
        movieRepository.findByImdbId(movieObj.imdbId, function(err, movie) {
            if (!movie) {
                movieRepository.insert(req.body, function(err) {
                    if (err) {
                        viewModel.error = err;
                    }
                    else {
                        viewModel.success = 'movie added successfully';
                    }
                    return res.render(view, viewModel);
                });
            }
            else {
                viewModel.error = 'movie already exists';
                viewModel.movie = movie;
                return res.render(view, viewModel);
            }
        });
    }

    // /movies/:id [GET]
    function get(req, res) {
        findAndRenderMovie(req.params.id, 'movies/get', 
            {subTitle: 'Movie Details'}, res);
    }

    // /movies/:id/edit [GET]
    function viewEditForm(req, res) {
        findAndRenderMovie(req.params.id, 'movies/edit', 
            {subTitle: 'Edit Movie'}, res); 
    }

    // /movies/:id/edit [POST]
    function update(req, res) {
        var view = 'movies/edit',
            viewModel = {subTitle: 'Edit Movie'}, 
            movieObj = req.body;

        movieRepository.update(req.params.id, movieObj, function(err, movie) {
            if (err) {
                viewModel.error = err;
            }
            else {
                viewModel.movie = movie;
                viewModel.success = 'movie updated successfully';
            }
            return res.render(view, viewModel);
        });
    }

    // /movies/:id/remove [GET]
    function viewRemoveForm(req, res) {
        findAndRenderMovie(req.params.id, 'movies/remove', 
            {subTitle: 'Remove Movie'}, res); 
    }

    // /movies/:id/remove [POST]
    function remove(req, res) {
        var view = 'movies/remove',
            viewModel = {subTitle: 'Remove Movie'};

        movieRepository.remove(req.params.id, function(err) {
            if (err) {
                viewModel.error =  err;
            }
            else {
                viewModel.success = 'movie was removed successfully';
            }
            return res.render(view, viewModel);
        });
    }

    return {
        findAndRenderMovie: findAndRenderMovie,
        index: index,
        viewAddForm: viewAddForm,
        add: add,
        get: get,
        viewEditForm: viewEditForm,
        update: update,
        viewRemoveForm: viewRemoveForm,
        remove: remove
    };

};