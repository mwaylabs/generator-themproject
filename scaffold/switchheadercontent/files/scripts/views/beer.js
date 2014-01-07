/*global <%= _.camelize(appname) %>*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function() {
    'use strict';

    <%= _.camelize(appname) %>.Views.BeerView = M.View.extend({
        cssClass: 'beer-container'
    }, {

        headline: M.View.extend({
            tagName: 'h1',
            value: M.I18N.get('beer.headline')
        }),

        back: M.ButtonView.extend({
            value: M.I18N.get('global.button.back'),
            events: {
                tap: function() {
                    <%= _.camelize(appname) %>.navigate({
                        route: '/',
                        transition: M.PageTransitions.MOVE_TO_RIGHT_FROM_LEFT
                    });
                }
            }
        })

    });

})();
