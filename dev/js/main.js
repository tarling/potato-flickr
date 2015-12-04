require.config({
    "shim" : {
        "angularjs" : {
          exports: "angular"
        }
        ,"angular-route" : {
          deps: ["angularjs"]
        }
        ,"gapi" : {
          exports: "gapi"
        }
    }
    ,"paths": {
      "angularjs": "../lib/angular/angular"
      ,"angular-route": "../lib/angular/angular-route"
      ,"gapi" : "https://apis.google.com/js/platform"
      ,"requireLib" : "../lib/require"
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
    ,"./directives"
  ], function(angular, constants) {

    angular.bootstrap(document, [constants.appName]);
    
  });