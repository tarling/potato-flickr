define([
  './app'
  , './constants'],function(app, constants){
	app.config(["$routeProvider", function($routeProvider){
      $routeProvider.
      when("/list", {
        templateUrl: "partials/list.html",
        controller: constants.listController,
        resolve: {
          items: function(dataService) {
            return dataService.getData();
          }
        }
      }).
      when("/details/:itemIdx", {
        templateUrl: "partials/details.html",
        controller: constants.detailsController,
        resolve: {
          items: function(dataService) {
            return dataService.getData();
          }
        }
      }).
      otherwise({
        redirectTo: "/list"
      })
    }]);
});