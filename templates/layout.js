/*global <%= _.camelize(appname) %>, M*/

<%= _.camelize(appname) %>.Layouts = <%= _.camelize(appname) %>.Layouts || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Layouts.<%= _.classify(name) %>Layout = M.Layout.extend({

        template: '<div></div>',

        applyViews: function() {

        }
    });

})();
