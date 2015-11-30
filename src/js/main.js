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
    
    var userNameRegExp = /nobody@flickr\.com \(([^)]*)\)/g;
    
    app.filter('extractName', function(){
      return function(name) {
        return name.replace(userNameRegExp, "$1");
      }
    });
    
    app.controller(
        'appController',
        ['$scope', '$http', function($scope, $http){
          
          function update() {
            if(!$scope.$$phase) {
              $scope.$apply();
            }
          }
          
          $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              $scope.items = response.data.items.map(function(item){
                //convert name to Date object so we can format it in the view
                item.date_taken = new Date(item.date_taken);
                return item;
              });
          });
          
          
        }]);
        
    angular.bootstrap(document, [appName]);
  });
