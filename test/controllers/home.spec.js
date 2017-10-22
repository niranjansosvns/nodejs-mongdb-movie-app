var expect = require('chai').expect,
    app = require('express')(),
    path = require('path'),
    http = require('http'),
    request = require('supertest'),
    config = require('../../config')().get('testing'),
    registrar = require('../../routes/registrar'),
    homeRoutes = require('../../routes/json/home'),
    homeController = require('../../controllers/home')(),
    server = http.createServer(app);

describe('home controller test', function() {

    before(function() {
        // register home routes
        registrar.registerRoute(app, homeRoutes, homeController);
        var url = 'http://' + config.host + ':' + config.port;
        request = request.bind(request, url);

        app.set('views', path.join(__dirname + '../../../', 'views'));
        app.set('view engine', 'jade');
    });

    describe('.index()', function() {
        it('should render the home index view', function(done) {
            server.listen(config.port, config.host, function() {
                request(app).get('/').end(function(err, res) {
                    expect(res.status).to.be.equal(200);
                    expect(res.text.indexOf('View Movies')).to.be.above(0);
                    done();
                });
            });
        });
    });

    after(function(done) {
        server.close(function(){
            done();
        });
    });
});