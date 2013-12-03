/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Layouts = <%= _.camelize(appname) %>.Layouts || {};

/**
 * A layout provides an easy way to switch between different
 * views with similar or different content.
 *
 * For further information go to:
 * http://the-m-project.org/docs/absinthe/Layout.html
 */

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Layouts.<%= _.classify(name) %>Layout = M.Layout.extend({

        template: '<div></div>',

        applyViews: function() {

        }
    });

})();
