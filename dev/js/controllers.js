define([
	'./app'
	, './constants'
],function(app, constants){
	
	var AppController = function($scope, $route){
	
		$scope.$on('$routeChangeSuccess', function(event, newVal, oldVal) {
			if (oldVal !== newVal) {
				//when route changes, add class to body
				$scope.routeClassName = $route.current.bodyClass;
			}
		});
		
		$scope.$on(constants.dataLoaded, function() {
			//when data has loaded, notify view
			$scope.loaded = true;
		});
	}
	AppController.$inject = ['$scope', '$route'];
	app.controller(constants.appController, AppController);
	
	
	var ListController = function($scope, items){
		$scope.items = items;
	}
	ListController.$inject = ['$scope', 'items'];
	app.controller(constants.listController, ListController);
		
	var DetailsController = function($scope, $location, $routeParams, items){
	
		//itemIdx is defined in routes configuration
		$scope.item = items[$routeParams.itemIdx];
		
		$scope.goBack = function() {
			$location.path('list');
		}
	}
	
	DetailsController.$inject = ['$scope', '$location', '$routeParams','items'];
	app.controller(constants.detailsController, DetailsController);
});