
(function(global) {
    'use strict';

    // PLEASE DON'T CHANGE OR REMOVE THE COMMENTS.
    // All comments in this file are necessary for the build process.

    global.<%= _.camelize(appname) %> = global.<%= _.camelize(appname) %> || {};

    global.<%= _.camelize(appname) %>.mconfig = {
        name: '<%= _.camelize(appname) %>',
        locales: [
            {locale: 'en'},
            //m:i18n
        ],
        debugView: NO
    };

})(this);