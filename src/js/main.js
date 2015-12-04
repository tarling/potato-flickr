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
    ,"./constants"
    ,"./app"
    ,"./controllers"
    ,"./data-service"
    ,"./filters"
    ,"./routes"
  ], function(angular, constants) {

    angular.bootstrap(document, [constants.appName]);

  });
