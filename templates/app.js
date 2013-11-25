/*global $, M*/


(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = M.Application.extend().create(m_config);

    $(document).ready(function() {

        global.<%= _.camelize(appname) %>.start({
            routing: {
                routes: {

                }
            },
            locales: [
                {locale: 'en'}
            ]
        });
    });

})(this);