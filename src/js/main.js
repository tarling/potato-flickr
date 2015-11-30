require.config({
    "shim" : {
        "angularjs" : {
          exports: "angular"
        }
        ,"angular-route" : {
          deps: ["angularjs"]
        }
        ,"angular-animate" : {
          deps: ["angularjs"]
        }
    }
    ,"paths": {
      "angularjs": "../lib/angular/angular"
      ,"angular-route": "../lib/angular/angular-animate"
      ,"angular-animate": "../lib/angular/angular-route"
    }
});

require( [
    "angularjs"
    ,"angular-route"
    ,"angular-animate"
  ], function(angular) {

    var appName = 'myApp';
    var app = angular.module(appName, ['ngRoute', 'allControllers', ]);

    //from https://github.com/chrisiconolly/angular-all-ordinal-filters/blob/master/app/package/js/ordinal.js
    function getOrdinal(input) {
      var n = input % 100;
      return n === 0 ? 'th' : (n < 11 || n > 13) ?
        ['st', 'nd', 'rd', 'th'][Math.min((n - 1) % 10, 3)] : 'th';
    }

    app.filter('extractName', function(){
      var userNameRegExp = /nobody@flickr\.com \(([^)]*)\)/g;
      return function(name) {
        return name.replace(userNameRegExp, "$1");
      }
    });

    app.filter('formatDate', function($filter){
      return function(dt) {
        //get date string as e.g. 3 Jan 2015
        var dateStr = $filter('date')(dt, 'd MMM yyyy HH:mm');
        var dateParts = dateStr.split(" ");
        var day = dateParts[0];
        dateParts[0] = day + getOrdinal(day);
        return dateParts.slice(0,3).join(" ") + " at " + dateParts[3];
      }
    });
    
    app.config(["$routeProvider", function($routeProvider){
      $routeProvider.
      when("/list", {
        templateUrl: "partials/list.html",
        controller:"ListController"
      }).
      when("/details/:itemIdx", {
        templateUrl: "partials/details.html",
        controller:"DetailsController"
      }).
      otherwise({
        redirectTo: "/list"
      })
    }]);
    
    
    var allControllers = angular.module('allControllers', []);

    /*controllers.controller(
        'AppController',
        ['$scope', '$http', function($scope, $http){

          $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              $scope.items = response.data.items.map(function(item){
                //convert name to Date object so we can format it in the view
                item.date_taken = new Date(item.date_taken);
                return item;
              });
          });


        }]);*/
        
      allControllers.controller(
        'ListController',
        ['$scope', '$http', function($scope, $http){

          console.log('ListController');
          $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              $scope.items = response.data.items.map(function(item){
                //convert name to Date object so we can format it in the view
                item.date_taken = new Date(item.date_taken);
                return item;
              });
          });


        }]);

      allControllers.controller(
        'DetailsController',
        ['$scope', '$http', '$routeParams','$sce', function($scope, $http, $routeParams, $sce){

          console.log('DetailsController');
          $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              var items = response.data.items.map(function(item){
                //convert name to Date object so we can format it in the view
                item.date_taken = new Date(item.date_taken);
                item.description = $sce.trustAsHtml(item.description);
                item.tags = item.tags.split(" ");
                return item;
              });
              
              $scope.item = items[$routeParams.itemIdx];
          });


        }]);

    angular.bootstrap(document, [appName]);
  });
