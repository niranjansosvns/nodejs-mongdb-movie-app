// register the routes in a json file
// convention routes = {
//   "route_path": {
//      "HTTP_METHOD": "Controller_Action"
//    } 
// }
function registerRoute(app, routes, controller) {
    // loop on routes
    Object.keys(routes).forEach(function(routePath) {
        // route object {method: action}
        var route = routes[routePath];
        // loop on methods of route object
        Object.keys(route).forEach(function(method) {
            var handler = controller[route[method]];
            // handle the route in express app
            app[method.toLowerCase()](routePath, handler);
        });
    });
}

// register all the routes in routesJson
// convention: routesJson = {"controller_name": {routeJson} }
function registerRoutes(app, routesJson, controllers) {
    var that = this;
    // loop on files names
    Object.keys(routesJson).forEach(function(controllerName) {
        // register the route
        that.registerRoute(app, routesJson[controllerName],
            controllers[controllerName]);
    });
}

// export routes registrar object
module.exports = {
    registerRoute: registerRoute,
    registerRoutes: registerRoutes
};