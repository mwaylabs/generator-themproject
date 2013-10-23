/*global <%= _.camelize(appname) %>, The-M-Project*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.<%= _.classify(name) %>Controller = M.Controller.extend({

    });

})();
