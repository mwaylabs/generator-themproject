'use strict';

class <%= _.camelize(appname) %>.Views.<%= _.classify(name) %>View extends Backbone.View

    template: JST['<%= jst_path %>']
