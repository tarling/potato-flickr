# potato-flickr
A single page app which allows a user to browse through photos available via Flickr's public feed. 

The app can be viewed [here](http://tarling.github.io/potato-flickr/deploy/).

## Overview

The project uses AngularJS to consume the [Flickr public API feed](https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json) and display it to the user. 

Using [require.js](https://github.com/jrburke/requirejs) allows us to break the application JS into small parts and manage dependencies. 

[Bootstrap](https://github.com/twbs/bootstrap) normalises some of the browser differences for us and gives a basis to build a responsive site on.

[Placeholders.js](https://github.com/jamesallardice/Placeholders.js) is a polyfill which provides input[placeholder] functionality for older browsers.

[css-spinners](https://github.com/jlong/css-spinners) is giving us a nice loading animation while we wait for the Flickr feed to load.

The app has been tested on Safari (OS X), Chrome, Firefox, Edge, IE 10, IE 9, Safari (iOS8, iOS9) on iPhone and iPad, and Android.


### Files

*/src*

The uncompressed JS, SCSS and HTML files which are copied to the target build folders during build

*/deploy*

A minified version of the app ready to be deployed to a production server

*/dev*

An uncompressed version of the project, useful when authoring and debugging the app

## Building

After installing node and npm, run `npm install` from the project directory to download and install all dependencies. 

Run `gulp dev` to build an uncompressed version to the `/dev` folder. 

Run `gulp` to build a minified version to the `/deploy` folder.

For both builds, you can then run `index.html` in the target build folder.

## Libraries

This project makes use of the following open source projects:

- [AngularJS](https://github.com/angular/angular.js)
- [require.js](https://github.com/jrburke/requirejs)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [Placeholders.js](https://github.com/jamesallardice/Placeholders.js)
- [css-spinners](https://github.com/jlong/css-spinners)
