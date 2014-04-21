var five = require('johnny-five'),
  _ = require('lodash'),
  board = board = new five.Board();


board.on("ready", function() {
  var light = new five.Led.RGB([9, 10, 11]);
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

  this.loop(1000, function () {
    light.color();
  });
});
