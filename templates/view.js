/*global <%= _.camelize(appname) %>, Backbone, JST*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Views.<%= _.classify(name) %>View = M.View.extend({

        template: JST['<%= jst_path %>']

    });

})();
