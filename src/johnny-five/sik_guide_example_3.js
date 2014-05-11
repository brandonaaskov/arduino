var five = require('johnny-five'),
  _ = require('lodash'),
  Q = require('q'),
  board = board = new five.Board();


board.on("ready", function() {
  var light = new five.Led.RGB([9, 10, 11]);
  var led = {
    red: new five.Led(9),
    green: new five.Led(10),
    blue: new five.Led(11)
  };
  var basicColors = ['FF0000', '00FF00', '0000FF', 'F200FF', 'FFFB00', 'FFFFFF'];
  var currentColor = undefined;

  var getNextColor = function () {
    if (_.isUndefined(currentColor)) {
      currentColor = _.first(basicColors);
      return currentColor;
    }

    var index = basicColors.indexOf(currentColor);
    if (basicColors[index+1]) return currentColor = basicColors[index+1];
    else return currentColor = _.first(basicColors);
  };

  function fade (color, fadeIn, time) {
    var deferred = Q.defer();
    if (!time) time = 2000;

    if (fadeIn) led[color].fade(255, time);
    else led[color].fade(0, time);
    board.wait(time, function () {
      deferred.resolve(this);
    });

    return deferred.promise;
  }

  function fadeInOut (color, time) {
    var deferred = Q.defer();
    fade(color, true, time).then(function () {
      fade(color, false, time).then(function () {
        deferred.resolve(board);
      });
    });

    return deferred.promise;
  }

  function changeColor (color, time) {
    var deferred = Q.defer();
    if (!time) time = 1000;

    light.color(color);

    board.wait(time, function () {
      deferred.resolve();
    });

    return deferred.promise;
  }

  function cycleColors () {
    var deferred = Q.defer();

    var time = 1000;

    changeColor(getNextColor(), time).then(function () {
      changeColor(getNextColor(), time);
    });

    board.wait(time * basicColors.length, function () {
      light.off();
      deferred.resolve(board);
    });

    return deferred.promise;
  }

  function fadeColors () {
    fadeInOut('red', 1000).then(function () {
      fadeInOut('blue', 1000).then(function () {
        fadeInOut('green', 1000)
      });
    });
  }

  cycleColors().then(function () {
    fadeColors();
  });
});
