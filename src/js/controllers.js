define([
	'./app'
	, './constants'
],function(app, constants){
	app.controller(
		constants.appController,
		['$scope', '$route', function($scope, $route){
	
			$scope.$on('$routeChangeSuccess', function(event, newVal, oldVal) {
				if (oldVal !== newVal) {
					$scope.routeClassName = $route.current.bodyClass;
				}
			});
	
		}]);
		
	app.controller(
		constants.listController,
		['$scope', 'items', function($scope, items){
	
			$scope.items = items;
	
		}]);

	app.controller(
		constants.detailsController,
		['$scope', '$routeParams','items', function($scope, $routeParams, items){
	
			//itemIdx is defined in routes configuration
			$scope.item = items[$routeParams.itemIdx];
	
		}]);
});