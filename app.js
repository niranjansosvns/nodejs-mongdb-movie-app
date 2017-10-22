    // third-party dependencies
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // first-party dependencies
    controllers = require('./controllers'),
    routesJson = require('./routes/json'),
    routes = require('./routes'),
    config = require('./config')(),
    db = require('./db/mongodb')(mongoose),

    // create an app instance
    app = express(),

    // get config by environment
    envConfig = config.get(app.get('env')),

    // create the server
    server = http.createServer(app),

    // build a db uri
    dbUri = db.getUri(envConfig.db.host, 
        envConfig.db.port, envConfig.db.dbName);

// middleware chain, pre-process the requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// setup template engine and views path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// register routes
routes.register(app, routesJson, controllers);

// asyn connect to db
db.connect(dbUri, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + dbUri);
        // after connected successfully to db, start listening to requests
        server.listen(envConfig.port, envConfig.host, function() {
            console.log('server is running at http://%s:%s', 
                envConfig.host, envConfig.port);
        });
    }
});

// when closing the server, disconnect from db
server.on('close', function() {
    db.disconnect(function(){});
});