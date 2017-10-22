var expect = require('chai').expect,
    mongoose = require('mongoose'),
    mongodb = require('../../db/mongodb')(mongoose),
    config = require('../../config')().get('testing'),
    uri;

describe('mongo test',  function() {

    before(function() {
        uri = mongodb.getUri(config.db.host, config.db.port, config.db.dbName);
    });

    describe('.getUri()', function() {
        it('should compose a mongodb uri', function() {
            expect(uri).to.be.equal('mongodb://' + config.db.host +
             ':' + config.db.port + '/' + config.db.dbName);
        });
    });

    describe('.connect()', function() {
        it('should connect to a mongodb', function(done) {
            mongodb.connect(uri, function(err) {
                if (err) {
                    console.log(err);
                }
                expect(mongoose.connection.readyState).to.be.equal(1);
                done(); // synchronize
            });
        });
    });

    describe('.disconnect()', function() {
        it('should disconenct from a mongodb', function(done) {
            mongodb.disconnect(function(err) {
                if (err) {
                    console.log(err);
                }
                expect(mongoose.connection.readyState).to.be.equal(0);
                done();
            });
        });
    });

});