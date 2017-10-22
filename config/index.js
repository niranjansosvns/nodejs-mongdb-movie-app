var configJson = require('./config');

module.exports = function(config) {
    return {
        // return config of a specific environment
        get: function(env) {
            var cJson = config ? config : configJson;
            return cJson[env] || cJson.development;
        }
    }
}