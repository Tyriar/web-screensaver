var webScreensaver = (function () {
  var module = {};

  var timeout;
  var sandbox;

  var currentPlugin = 0;
  var eventInit = false;
  var config = {
    url: undefined,
    waitTime: 60,
    script: undefined
  };

  module.plugins = [];
  module.plugin = undefined;

  function restart() {
    if (sandbox) {
      module.plugins[currentPlugin].object.stop();
      document.body.removeChild(sandbox);
      sandbox = undefined;
      currentPlugin = (currentPlugin + 1) % module.plugins.length;
    }

    // TODO: Only restart timeout once per second
    if (timeout) {
      clearTimeout(timeout);
    }

    if (config.waitTime > 0) {
      timeout = setTimeout(downloadThenStart, config.waitTime * 1000);
    }
  }

  function initEvents() {
    document.body.addEventListener('mousedown', restart);
    document.body.addEventListener('mousemove', restart);
    document.body.addEventListener('keydown', restart);
    eventInit = true;
  }

  function ajax(url, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200){
        callback(request.responseText);
      }
    };
    request.open("GET", url, true);
    request.send();
  }

  function insertScript(script) {
    var src = document.createElement('script');
    src.setAttribute('type', 'text/javascript');
    src.textContent = script;
    document.body.appendChild(src);
  }

  function createSandbox() {
    var element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left     = 0;
    element.style.top      = 0;
    element.style.right    = 0;
    element.style.bottom   = 0;
    document.body.appendChild(element);
    return element;
  }

  function downloadThenStart() {
    if (!module.plugins[currentPlugin].object) {
      ajax(module.plugins[currentPlugin].url, function (data) {
        insertScript(data);
        show();
      });
    } else {
      show();
    }
  }

  function show() {
    if (!module.plugins[currentPlugin].object) {
      // oh noes
      return;
    }

    sandbox = createSandbox();
    module.plugins[currentPlugin].object.start(sandbox);

    // set a variable based on the plugin name?
    // leave 'var plugin = ' part up to the framework?
  }

  module.init = function (plugins, waitTime) {
    if (!(plugins instanceof Array)) {
      var array = [];
      array.push(plugins);
      plugins = array;
    }

    while (plugins.length > 0) {
      var i = Math.floor(Math.random() * plugins.length);
      module.plugins.push({
        url: plugins.splice(i, 1),
        object: undefined
      });
    }

    if (waitTime) {
      config.waitTime = waitTime;
    }

    if (!eventInit) {
      initEvents();
    }

    restart();
  };

  module.registerPlugin = function (object) {
    module.plugins[currentPlugin].object = object;
    restart();
  };

  return module;
})();
