define(['./app'],function(app){
	
	app.factory("dataService", function($http, $sce){
      return {
        getData:function(){
          return $http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK')
            .then(function(response) {
              return response.data.items.map(function(item){
                //convert name to Date object so we can format it in the view
                item.date_taken = new Date(item.date_taken);
                item.description = $sce.trustAsHtml(item.description);
                item.tags = item.tags.split(" ");
                return item;
              });
          });
        }
      }
    });
	
});