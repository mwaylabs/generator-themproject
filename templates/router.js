/*global <%= _.camelize(appname) %>, M*/

<%= _.camelize(appname) %>.Routers = <%= _.camelize(appname) %>.Routers || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Routers.<%= _.classify(name) %>Router = M.Router.extend({

    });

})();
