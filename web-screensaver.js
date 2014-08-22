var webScreensaver = (function () {
  var module = {};

  var timeout;

  var config = {
    url: undefined,
    waitTime: 60,
    script: undefined
  };

  function restart() {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(module.downloadThenStart, waitTime);
  }

  module.register = function (url, waitTime) {
    if (!url) {
      return;
    }

    config.url = url;
    if (waitTime) {
      config.waitTime = waitTime;
    }
    restart();
  };

  module.downloadThenStart = function () {
    if (!config.script) {
      // TODO: Download script, then call show after setting script
      config.script = 'alert("time")';
      module.show();
    } else {
      module.show();
    }
  };

  // TODO: Hook up input listeners

  module.show = function () {
    var src = document.createElement('script');
    src.setAttribute('type', 'text/javascript');
    // TODO: Make sure relative URLs work
    //src.setAttribute('src', config.url);
    src.textContent = config.script;
    document.head.appendChild(src);
    // remove the script after it's run?
    // set a variable based on the plugin name?
    // leave 'var plugin = ' part up to the framework?
  }

  return module;
})();
