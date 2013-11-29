/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Collections = <%= _.camelize(appname) %>.Collections || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Collections.<%= _.classify(name) %>Collection = M.Collection.extend({

        model: <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model

    });

})();
