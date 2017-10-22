var registrar = require('./registrar');

module.exports = {
    // set context to registrar
    register: registrar.registerRoutes.bind(registrar)
};