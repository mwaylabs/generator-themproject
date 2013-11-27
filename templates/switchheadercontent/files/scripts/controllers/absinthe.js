/*global <%= _.camelize(appname) %>, M*/

<%= _.camelize(appname) %>.Controllers = <%= _.camelize(appname) %>.Controllers || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Controllers.AbsintheController = M.Controller.extend({

        _absintheView: null,

        applicationStart: function() {
            this._initLayout();
        },

        show: function() {
            this._setViews();
            <%= _.camelize(appname) %>.getLayout().startTransition();
        },

        _initLayout: function() {
            var _layout = M.SwitchHeaderContentLayout.design(this, null, true);
            <%= _.camelize(appname) %>.setLayout(_layout);
            this._setViews();
        },

        _setViews: function() {
            if(!this._absintheView) {
                this._absintheView = <%= _.camelize(appname) %>.Views.AbsintheView.create(this);
            }
            <%= _.camelize(appname) %>.getLayout().applyViews({
                content: this._absintheView
            });
        }
    });

})();
