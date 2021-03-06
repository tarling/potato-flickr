define(['./app', './constants'],function(app, constants){
	
	app.factory(constants.dataService, 
        ['$http', '$sce', '$q', '$timeout', '$rootScope', function($http, $sce, $q, $timeout, $rootScope){
        var items;
        return {
            getData:function(){
                if (items)
                {
                    //if items has already been defined, reuse it
                    var deferred = $q.defer();
                    deferred.resolve(items);
                    return deferred.promise;
                } else {
                    return $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
                        .then(function(response) {
                        items = response.data.items.map(function(item){
                            //convert name to Date object so we can format it in the view
                            item.date_taken = new Date(item.date_taken);
                            //unescape HTML
                            item.description = $sce.trustAsHtml(item.description);
                            item.tags = item.tags.split(" ");
                            return item;
                        });
                        
                        //notify app that the data has loaded
                        $rootScope.$broadcast(constants.dataLoaded);
                        
                        return items;
                    });
                }
            }
        }
    }]);
	
});