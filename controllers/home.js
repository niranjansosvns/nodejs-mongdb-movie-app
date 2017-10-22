module.exports = function() {
    
    'use strict';

    // handler for / [GET]
    function index(req, res) {
        return res.render('home/index');
    }
    
    return {
        index: index
    };
};