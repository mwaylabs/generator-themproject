/*global $, M*/


(function(global) {
    'use strict';

    M.APPLICATION_NAME = '<%= _.camelize(appname) %>';
    global.<%= _.camelize(appname) %> = M.Application.design();

    $(document).ready(function() {

        global.<%= _.camelize(appname) %>.start({
            routing: {
                routes: {
                    '': 'absintheController',
                    'beer': 'beerController'
                },
                absintheController: global.<%= _.camelize(appname) %>.Controllers.AbsintheController.create(),
                beerController: global.<%= _.camelize(appname) %>.Controllers.BeerController.create()
            },
            locales: [
                {locale: 'en'}
            ]
        });
    });

})(this);