# web-screensaver [![NPM version](http://img.shields.io/npm/v/web-screensaver.svg?style=flat)](https://www.npmjs.org/package/web-screensaver)

Displays a 'screensaver' in a sandbox element after a configurable amount of seconds of no user input. Supports multiple types of screensaver plugins that are randomly selected. Downloading of individual plugins are deferred until they're required so impact on page load time is minimal.

## Installing

```bash
# via bower
bower install --save web-screensaver

# via npm
npm install --save web-screensaver
```

## Including

```html
<script src="bower_components/web-screensaver/web-screensaver.js"></script>
```

## Usage

```javascript
// Register plugin-url.js, wait the default time after no input
webScreensaver.init('plugin-url.js');

// Register plugin-url.js, wait for 2 minutes after no input
webScreensaver.init('plugin-url.js', 120);

// Register multiple plugins
webScreensaver.init([
  'plugin-url1.js',
  'plugin-url2.js'
], 120);
```

## Creating plugins

Plugins are the scripts that actually do the visual work, the framework calls in to `start` and `stop` functions on the plugin which set everything up and tear everything down respectively. Here is the structure of a plugin:

```javascript
webScreensaver.registerPlugin((function () {
  var module = {};

  module.start = function (sandbox) {
    // Start the screensaver
  };

  module.stop = function () {
    // Stop the screensaver
  };

  return module;
})());
```

## License

MIT © [Daniel Imms][1]



  [1]: https://github.com/Tyriar/web-screensaver/blob/master/LICENSE
