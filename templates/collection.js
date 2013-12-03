/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Collections = <%= _.camelize(appname) %>.Collections || {};

/**
 * A collection is just a list of models and even more.
 * It contains a bunch of helper functions, sync logic
 * and events.
 *
 * For further information go to:
 * http://the-m-project.org/docs/absinthe/Collection.html
 * http://backbonejs.org/#Collection
 */

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Collections.<%= _.classify(name) %>Collection = M.Collection.extend({

        model: <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model

    });

})();
