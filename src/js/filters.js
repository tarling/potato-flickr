define([
	'./app'
],function(app){
	
	function getOrdinal(input) {
        //from https://github.com/chrisiconolly/angular-all-ordinal-filters/blob/master/app/package/js/ordinal.js
        var n = input % 100;
        return n === 0 ? 'th' : (n < 11 || n > 13) ?
            ['st', 'nd', 'rd', 'th'][Math.min((n - 1) % 10, 3)] : 'th';
    }

    app.filter('extractName', function(){
      //item.author seems to be in the format nobody@flickr.com (USERNAME). if it is, extract USERNAME
      var userNameRegExp = /nobody@flickr\.com \(([^)]*)\)/g;
      return function(name) {
        return name.replace(userNameRegExp, "$1");
      }
    });

    app.filter('formatDate', function($filter){
      //format date as e.g. 3rd Jan 2015
      return function(dt) {
        //get date string using angular date filter e.g. 3 Jan 2015
        var dateStr = $filter('date')(dt, 'd MMM yyyy HH:mm');
        var dateParts = dateStr.split(" ");
        var day = dateParts[0];
        //add ordinal suffix to date
        dateParts[0] = day + getOrdinal(day);
        return dateParts.slice(0,3).join(" ") + " at " + dateParts[3];
      }
    });
	
});