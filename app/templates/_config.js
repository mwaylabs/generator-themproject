
(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = global.<%= _.camelize(appname) %> || {};

    global.<%= _.camelize(appname) %>.mconfig = {
        name: '<%= _.slugify(appname) %>',
        locales: [
            {locale: 'en'}
        ],
        showDebugView: NO
    };

})(this);