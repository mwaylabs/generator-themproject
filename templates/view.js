/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Views.<%= _.classify(name) %>View = M.View.extend({
        // The properties of a view

        // The views grid
        grid: 'col-xs-12'
    }, {
        // The childViews as object
        // e.q. button: M.ButtonView.extend({value: 'Test'})
    });

})();
