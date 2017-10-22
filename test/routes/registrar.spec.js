var expect = require('chai').expect,
    app = require('express')(),
    http = require('http'),
    config = require('../../config')().get('testing'),
    request = require('supertest'),
    registrar = require('../../routes/registrar');


describe('routes registrar test', function() {

    var controllers = {
            home: {
                index: function(req, res) {
                    res.end('index response');
                }
            },
            test: {
                testGet: function(req, res) {
                    res.end('testGet response');
                },
                testPost: function(req, res) {
                    res.end('testPost response');
                }
            }
        },
        routes = {
            home: {
                "/": {
                    "GET": "index"
                }
            },
            test: {
                "/test": {
                    "GET": "testGet",
                    "POST": "testPost"
                }
            }
        },

        server = http.createServer(app),
        url = 'http://' + config.host + ':' + config.port;

    before(function() {
        request = request.bind(request, url);
    });

    describe('.registerRoute()', function() {
        it('should register a route with a controller in an app', function(done) {
            // register a route
            registrar.registerRoute(app, routes.home, controllers.home);
            // listen to the test server:port
            server.listen(config.port, config.host, function(err){
                // make a request to the registered route
                request(app).get('/').expect(200, 'index response').end(done);
            });
        });
    });

    describe('.registerRoutes()', function() {
        it ('should register many routes with app instance', function() {
            // register many routes
            registrar.registerRoutes(app, routes, controllers); 
        });
        it('should request a route with get', function(done) {
            request(app).get('/').expect(200, 'index response').end(done);
        });
        it('should request a route with post', function(done) {
            request(app).post('/test').expect(200, 'testPost response').end(done);
        });
    });


    after(function(done) {
        server.close(function(){
            done();
        });
    });
});