/*global $*/

// PLEASE DON'T CHANGE OR REMOVE THE COMMENTS.
// All comments in this file are necessary for the build process.

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
