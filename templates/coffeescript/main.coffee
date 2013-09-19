window.<%= _.camelize(appname) %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    'use strict'
    console.log 'Hello from TMP2!'

$ ->
  'use strict'
  <%= _.camelize(appname) %>.init();
