define([
	'./app'
	, './constants'
],function(app, constants){
	app.controller(
		constants.appController,
		['$scope', '$route', '$rootScope', function($scope, $route, $rootScope){
	
			$scope.$on('$routeChangeSuccess', function(event, newVal, oldVal) {
				if (oldVal !== newVal) {
					$scope.routeClassName = $route.current.bodyClass;
				}
			});
			
			$rootScope.$on(constants.dataLoaded, function() {
				$scope.loaded = true;
			});
	
		}]);
		
	app.controller(
		constants.listController,
		['$scope', 'items', function($scope, items){
	
			$scope.items = items;
	
		}]);

	app.controller(
		constants.detailsController,
		['$scope', '$location', '$routeParams','items', function($scope, $location, $routeParams, items){
	
			//itemIdx is defined in routes configuration
			$scope.item = items[$routeParams.itemIdx];
			
			$scope.goBack = function() {
				$location.path('list');
			}
	
		}]);
});