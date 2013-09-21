/*global <%= _.camelize(appname) %>, Backbone*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.<%= _.classify(name) %>Controller = M.Controller.extend({

    });

})();
