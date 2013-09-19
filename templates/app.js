define([
    'themproject',
    'routes/router'
], function( M, Router ) {

    window.<%= _.camelize(appname) %> = new M.Application();
    <%= _.camelize(appname) %>.start({
        router: new Router()
    });
});