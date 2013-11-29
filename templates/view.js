/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Views.<%= _.classify(name) %>View = M.View.extend({
        grid: 'col-xs-12'
    }, {

    });

})();
