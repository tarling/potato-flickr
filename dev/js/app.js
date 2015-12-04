define([
	"angularjs"
	,"angular-route"
    ,"./constants"],function(angular, angRoute, constants){
		
	var app = angular.module(constants.appName, ['ngRoute']);
	return app;
	
});