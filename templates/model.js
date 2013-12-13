/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Models = <%= _.camelize(appname) %>.Models || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model = M.Model.extend({
        // The Model Identifier
        idAttribute: '_id'
        //The Model options
    });

})();
