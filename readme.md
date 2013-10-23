# The-M-Project generator

A [Yeoman](http://yeoman.io) generator for [The-M-Project](http://the-m-project.org).

## Notice
This module is under development and not yet ready for production use.

## Getting Started

- Install: `npm install -g generator-tmp2`
- Run: `yo tmp2`
- Run `grunt` for building and `grunt server` for preview

## Generators

Available generators:

- tmp2:model
- tmp2:view
- tmp2:collection
- tmp2:controller
- tmp2:router
- tmp2:all

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
