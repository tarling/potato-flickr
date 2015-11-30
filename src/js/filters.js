define([
	'./app'
],function(app){
	
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
	
});