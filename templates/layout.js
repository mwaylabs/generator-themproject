/*global <%= _.camelize(appname) %>, The-M-Project*/

<%= _.camelize(appname) %>.Layouts = <%= _.camelize(appname) %>.Layouts || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Layouts.<%= _.classify(name) %>Layout = M.Layout.extend({

    });

})();
