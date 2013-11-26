/*global <%= _.camelize(appname) %>, M*/

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

        text: M.View.extend({
            value: M.I18N.get('beer.text')
        }),

        subline: M.View.extend({
            tagName: 'h2',
            value: M.I18N.get('beer.subline')
        }),

        links: M.ButtonGroupView.extend({

        }, {

            gettingStarted: M.ButtonView.extend({
                value: M.I18N.get('beer.links.getStarted'),
                events: {
                    tap: function() {
                        window.location.href = 'http://the-m-project.org';
                    }
                }
            }),

            documentation: M.ButtonView.extend({
                value: M.I18N.get('beer.links.documentation'),
                events: {
                    tap: function() {
                        window.location.href = 'http://docs.the-m-project.org';
                    }
                }
            })
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
