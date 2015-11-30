define([
	"angularjs"
	,"angular-route"
    ,"angular-animate"
	,"./constants"],function(angular, angRoute, angAnim, constants){
		
	var app = angular.module(constants.appName, ['ngRoute']);
	return app;
	
});