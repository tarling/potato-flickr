define([
	'./app'
	, "gapi"
],function(app, gapi){
	
	app.directive('plusone', function() {
		
		//idea from http://jasonwatmore.com/post/2014/08/01/AngularJS-directives-for-social-sharing-buttons-Facebook-Like-GooglePlus-Twitter-and-Pinterest.aspx
		return {
			link: function (scope, element, attrs) {
				element.addClass("g-plusone");
				element.attr("data-href", attrs.plusone);
				gapi.plusone.go(element.parent()[0]);
			}
		}
	});
});