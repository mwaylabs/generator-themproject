/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.<%= _.classify(name) %>Controller = M.Controller.extend({

        // Called from the router when the application starts
        applicationStart: function () {
            console.log('<%= _.classify(name) %>Controller.applicationStart()');
        },

        // Called from the router everytime the route/url matchs the controller (binding in main.js)
        show: function () {
            console.log('<%= _.classify(name) %>Controller.show()');
        },

        // Called for every controller when the application is ready. applicationStart is always called before.
        applicationReady: function () {
            console.log('<%= _.classify(name) %>Controller.applicationReady()');
        },
    });

})();
