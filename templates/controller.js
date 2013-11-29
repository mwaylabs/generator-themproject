/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.<%= _.classify(name) %>Controller = M.Controller.extend({

        applicationStart: function () {
            console.log('<%= _.classify(name) %>Controller.applicationStart()');
        },

        show: function () {
            console.log('<%= _.classify(name) %>Controller.show()');
        },

        applicationReady: function () {
            console.log('<%= _.classify(name) %>Controller.applicationReady()');
        },
    });

})();
