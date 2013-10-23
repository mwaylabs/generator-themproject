/*global <%= _.camelize(appname) %>, $*/


window.<%= _.camelize(appname) %> = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from The-M-Project!');
    }
};

$(document).ready(function () {
    'use strict';
    <%= _.camelize(appname) %>.init();
});
