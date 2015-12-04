define([
  './app'
  , './constants'
],function(app, constants){
	app.config(["$routeProvider", function($routeProvider){
      $routeProvider.
      when("/list", {
        templateUrl: "partials/list.html",
        controller: constants.listController,
        bodyClass: 'list',
        resolve: {
          items: [constants.dataService, function(dataService) {
            return dataService.getData();
          }]
        }
      }).
      when("/details/:itemIdx", {
        templateUrl: "partials/details.html",
        controller: constants.detailsController,
        bodyClass: 'details',
        resolve: {
          items: [constants.dataService, function(dataService) {
            return dataService.getData();
          }]
        }
      }).
      otherwise({
        redirectTo: "/list"
      })
    }]);
});