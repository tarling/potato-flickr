require.config({
    "shim" : {
        "angularjs" : {
          exports: "angular"
        }
    }
    ,"paths": {
      "angularjs": "../lib/angular"
    }
});

require( [
    "angularjs"
  ], function(angular) {
    var appName = 'myApp'; 
    var app = angular.module(appName, []);
    app.controller(
        'appController',
        ['$scope', '$http', function($scope, $http){
          
          function update() {
            if(!$scope.$$phase) {
              $scope.$apply();
            }
          }
          
          $scope.isNullDate = function(d) {
            return d.valueOf() == 0;
          }
          
          $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              $scope.items = response.data.items.map(function(item){
                item.date_taken = new Date(item.date_taken);
                return item;
              });
          });
          
          
        }]);
        
    angular.bootstrap(document, [appName]);
  });
