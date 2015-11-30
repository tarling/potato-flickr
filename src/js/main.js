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
