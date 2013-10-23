/*global <%= _.camelize(appname) %>, The-M-Project*/

<%= _.camelize(appname) %>.Routers = <%= _.camelize(appname) %>.Routers || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Routers.<%= _.classify(name) %>Router = M.Router.extend({

    });

})();
