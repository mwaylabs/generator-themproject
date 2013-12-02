
(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = global.<%= _.camelize(appname) %> || {};

    global.<%= _.camelize(appname) %>.mconfig = {
        name: '<%= _.camelize(appname) %>',
        locales: [
            {locale: 'en'}
        ],
        debugView: NO
    };

})(this);