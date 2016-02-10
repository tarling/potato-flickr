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
      "angularjs": "../../bower_components/angular/angular"
      ,"angular-route": "../../bower_components/angular-route/angular-route"
      ,"gapi" : "https://apis.google.com/js/platform"
      ,"requireLib" : "../../bower_components/requirejs/require"
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

    /*
    activate the Placeholders polyfill
    if it was loaded (via an IE conditional tag)
    */
    if (window.Placeholders) window.Placeholders.enable();

  });
