
(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = global.<%= _.camelize(appname) %> || {};

    global.<%= _.camelize(appname) %>.mconfig = {
        name: '<%= _.slugify(appname) %>',
        locales: [
            {locale: 'en'}
        ],
        debugView: NO
    };

})(this);