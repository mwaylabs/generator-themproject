# The-M-Project generator [![Build Status](https://travis-ci.org/mwaylabs/generator-m.png)](https://travis-ci.org/mwaylabs/generator-m) [![Coverage Status](https://coveralls.io/repos/mwaylabs/generator-m/badge.png?branch=master)](https://coveralls.io/r/mwaylabs/generator-m?branch=master)

A [Yeoman](http://yeoman.io) generator for [The-M-Project](http://the-m-project.org).

## Notice
This module is under development and not yet ready for production use.

## Getting Started

Make sure you have installed Node.js, Git and optionally, Ruby and Compass (if you plan to use Compass).

Install: `npm install -g generator-m`

Create a folder and name it after the application name and `cd` into it:
```bash
mkdir my-new-project && cd $_
```

Run the yo generator:
```bash
yo m
```

Run `grunt` for building and `grunt server` for preview

## Generators

Available generators:

* [m](#app)
* [m:view](#view)
* [m:layout](#layout)
* [m:controller](#controller)
* [m:model](#model)
* [m:collection](#collection)
* [m:router](#router)
* [m:i18n](#i18n)

### App
Create a new The-M-Project app and generate all the boilerplate for you.

```bash
yo m
```

### View

Generates a view in `app/scripts/views`.

Example:
```bash
yo m:view foo
```

Produces `app/scripts/views/foo.js`:

```javascript
APPNAME.Views.FooView = M.View.extend({
   // ...
})
```
### Layout

Generates a layout in `app/scripts/layouts`.

Example:
```bash
yo m:layout foo
```

Produces `app/scripts/layouts/foo.js`:

```javascript
APPNAME.Layouts.FooLayout = M.Layout.extend({
   // ...
})
```

### Controller

Generates a controller in `app/scripts/controllers`.

Example:
```bash
yo m:controller foo
```

Produces `app/scripts/controllers/foo.js`:

```javascript
APPNAME.Controllers.FooController = M.Controller.extend({
   // ...
})
```

### Model

Generates a model in `app/scripts/models`.

Example:
```
yo m:model foo
```

Produces `app/scripts/models/foo.js`:

```
APPNAME.Models.FooModel = M.Model.extend({
   // ...
})
```

### Collection

Generates a collection in `app/scripts/collections`.

Example:
```bash
yo m:collection foo
```

Produces `app/scripts/collections/foo.js`:

```javascript
APPNAME.Collections.FooCollection = M.Collection.extend({
   // ...
})
```

### Router

Generates a router in `app/scripts/routers`.

Example:
```bash
yo m:routers foo
```

Produces `app/scripts/routers/foo.js`:

```javascript
APPNAME.Routers.FooRouter = M.Router.extend({
   // ...
})
```

### I18N

Generates a i18n in `app/i18n`.

Example:
```bash
yo m:i18n en
```

Produces `app/i18n/en.json`:

```json
{
    "global.button.save": "Save document",
    "global.button.emptyTrash": "Empty Trash ({{count}})",
    "global.error.permissionDenied": "Permission denied"
}
```

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework <framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.


## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
