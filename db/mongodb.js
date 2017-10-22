module.exports = function(mongoose) {

    'use strict';

    function getUri(host, port, dbName) {
        return 'mongodb://' + host + ':' + port + '/' + dbName;
    }

    function connect(uri, callback) {
        // asynchronous operation
        mongoose.connect(uri, callback);
    }

    function disconnect(callback) {
        // asynchronous operation
        mongoose.disconnect(callback);
    }

    // return a mongodb object
    return {
        getUri: getUri,
        connect: connect,
        disconnect: disconnect
    };
};