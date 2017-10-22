var expect = require('chai').expect,
    express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('../../config')().get('testing'),
    db = require('../../db/mongodb')(mongoose),
    registrar = require('../../routes/registrar'),
    movieRoutes = require('../../routes/json/movies'),
    movieRepository = require('../../repositories/movies'),
    movieController = require('../../controllers/movies')(movieRepository),
    server = http.createServer(app);
    
describe('movie controller test', function() {

    before(function(done) {
        var url = 'http://' + config.host + ':' + config.port;
        
        request = request.bind(request, url);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.set('views', path.join(__dirname + '../../../', 'views'));
        app.set('view engine', 'jade');

        // register movie routes
        registrar.registerRoute(app, movieRoutes, movieController);

        // create test db uri
        var dbUri = db.getUri(config.db.host, config.db.port, config.db.dbName);

        // connect to the test db
        db.connect(dbUri, function(err) {
            if (err) {
                console.log(err);
            }
            done();
        });
    });

    describe('.viewAddForm()', function() {
        it('should render the movie add form', function(done) {
            server.listen(config.port, config.host, function() {
                request(app).get('/movies/add').end(function(err, res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.text.indexOf('Add A New Movie')).to.be.above(0);
                    done();
                });
            });
        });
    });

    describe('.add()', function() {
        it('should add a new movie and return success message', function(done) {
            request(app).post('/movies/add')
                .send({
                    title: 'Test Movie',
                    imdbId: 'tt1234567',
                    duration: '130',
                    year: '2000',
                    description: 'this is a test movie',
                    director: 'unknown',
                    posterUrl: 'none'
                })
                .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('movie added successfully')).to.be.above(0);
                done();
            });
        });
        it('should return a fail message if movie exists', function(done) {
            request(app).post('/movies/add')
                .send({
                    title: 'Test Movie',
                    imdbId: 'tt1234567',
                    duration: '130',
                    year: '2000',
                    description: 'this is a test movie',
                    director: 'unknown',
                    posterUrl: 'none'
                }).end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('movie already exists')).to.be.above(0);
                done();
            });
        });
    });


    describe('.index()', function() {
        it('should render the all movies view', function(done) {
            request(app).get('/movies').end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('All movies')).to.be.above(0);
                expect(res.text.indexOf('tt1234567')).to.be.above(0);
                done();
            });
        });
    });

    describe('.get()', function() {
        it('should render the movie details view', function(done) {
            request(app).get('/movies/tt1234567').end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('Movie Details')).to.be.above(0);
                expect(res.text.indexOf('tt1234567')).to.be.above(0);
                done();
            });
        });
    });

    describe('.viewEditForm()', function() {
        it('should render the movie edit form', function(done) {
            request(app).get('/movies/tt1234567/edit').end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('Edit Movie')).to.be.above(0);
                done();
            });
        });
    });

    describe('.update()', function() {
        it('should update an existing movie the movie edit form', function(done) {
            request(app).post('/movies/tt1234567/edit')
                .send({
                    title: 'Test Movie Updated',
                    imdbId: 'tt1234567',
                    duration: '130',
                    year: '2000',
                    description: 'this is a test movie',
                    director: 'unknown',
                    posterUrl: 'none'
                })
                .end(function(err, res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.text.indexOf('Test Movie Updated')).to.be.above(0);
                    done();
            });
        });
    });

    describe('.viewRemoveForm()', function() {
        it('should render the movie remove form', function(done) {
            request(app).get('/movies/tt1234567/remove').end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('Remove Movie')).to.be.above(0);
                done();
            });
        });
    });

    describe('.remove()', function() {
        it('should remove a movie', function(done) {
            request(app).post('/movies/tt1234567/remove')
                .send({imdbId: 'tt1234567'})
                .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.text.indexOf('movie was removed successfully')).to.be.above(0);
                done();
            });
        });
    });

    after(function(done) {
        db.disconnect(function() {
            server.close(function(){
                done();
            });
        });
    });
});