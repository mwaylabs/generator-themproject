/*global $*/


(function(global) {
    'use strict';

    global.<%= _.camelize(appname) %> = M.Application.extend().create(global.<%= _.camelize(appname) %>.mconfig);

    $(document).ready(function() {

        global.<%= _.camelize(appname) %>.start({
            routing: {
                routes: {
                    //m:routes
                },
                //m:controllers
            }
        });
    });

})(this);
