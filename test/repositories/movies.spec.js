var expect = require('chai').expect,
    mongoose = require('mongoose'),
    db = require('../../db/mongodb')(mongoose),
    config = require('../../config')().get('testing'),
    movieRepository = require('../../repositories/movies');

describe('movie repository test',  function() {

    before(function(done) {
        var uri = db.getUri(config.db.host, config.db.port, config.db.dbName);
        db.connect(uri, function() {
            done();
        });
    }); 

    describe('.insert()', function() {
        it('shoud insert a movie', function(done) {
            var movie = {
                title: 'Test Movie',
                imdbId: 'tt1234567',
                duration: '130',
                year: '2000',
                description: 'this is a test movie',
                director: 'unknown',
                posterUrl: 'none'
            };

            movieRepository.insert(movie, function(err, movie) {
                if (err) {
                    console.log(err);
                }
                expect(movie).to.be.an('object')
                  .and.to.have.property('id')
                  .and.to.have.length.above(0);
                 
                done();
            });
        });
    });

    describe('.findByImdbId()', function() {
        it('should retreive a movie by imdbId', function(done) {
            movieRepository.findByImdbId('tt1234567', function(err, movie) {
                if (err) {
                    console.log(err);
                }

                expect(movie).to.be.an('object')
                  .and.to.have.property('title')
                  .and.to.be.equal('Test Movie');

                done();
            });
        });
    });

    describe('.findAll()', function() {
        it('should retreive all movies', function(done) {
            movieRepository.findAll(function(err, movies) {
                if (err) {
                    console.log(err);
                }
                expect(movies).to.be.an('array')
                  .and.to.have.length.above(0);

                done();
            }); 
        });
    });

    describe('.update()', function() {
        it('should update a movie', function(done) {
            movieRepository.update('tt1234567', {
                title: 'Test Movie Updated'
            }, function(err, movie) {
                if (err) {
                    console.log(err);
                }

                expect(movie).to.be.an('object')
                  .and.to.have.property('title')
                  .and.to.be.equal('Test Movie Updated');

                done();
            }); 
        });
    });

    describe('.remove()', function() {
        it('should remove a movie', function(done) {
            movieRepository.remove('tt1234567', function(err, removedMovie) {
                if (err) {
                    console.log(err);
                }
                
                expect(removedMovie).to.be.an('object')
                  .and.to.have.property('imdbId')
                  .and.to.be.equal('tt1234567');

                done();
            }); 
        });
    });

    after(function(done) {
        db.disconnect(function() {
            done();
        });
    });
});