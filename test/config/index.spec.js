var expect = require('chai').expect,
    config = require('../../config');

describe('config test', function(){

    // add another environment
    configJson= {
        "development": {
            "host": "localhost",
            "port": 3000,
            "db": {
                "host": "localhost",
                "port": 27017,
                "dbName": "nodejs-movie-app"
            }
        },
        "production": {
            "host": "127.0.0.1",
            "port": 80,
            "db": {
                "host": "127.0.0.1",
                "port": 3100,
                "dbName": "nodejs-movie-app"
            }
        }
    };

    // create a config object
    config = config(configJson);

    describe('.get(env)', function() {
        it('should return a specific environment config', function() {
            var envConfig = config.get('production');
            expect(envConfig).to.be.an('object')
              .and.to.have.property('host')
              .and.to.be.equal('127.0.0.1');
        });

        it('should return a default development config', function() {
            var envConfig = config.get();
            expect(envConfig).to.be.an('object')
              .and.to.have.property('host')
              .and.to.be.equal('localhost');
        });
    });

});