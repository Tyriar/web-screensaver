webScreensaver.registerPlugin((function () {
  var module = {};

  var container;

  module.start = function (sandbox) {
    container = sandbox;
    container.style.opacity = '0';
    container.style.backgroundColor = '#000';
    container.style.transition = 'opacity 2s ease-in-out';
    setTimeout(function () {
      container.style.opacity = '1';
    }, 0);
  };

  module.stop = function () { };

  return module;
})());
