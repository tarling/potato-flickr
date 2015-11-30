define([
	'./app'
	, './constants'
],function(app, constants){
	app.controller(
		constants.listController,
		['$scope', 'items', function($scope, items){
	
			$scope.items = items;
	
		}]);

      app.controller(
        constants.detailsController,
        ['$scope', '$routeParams','items', function($scope, $routeParams, items){

          $scope.item = items[$routeParams.itemIdx];

        }]);
});