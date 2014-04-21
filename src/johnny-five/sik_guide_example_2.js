var five = require('johnny-five'),
  _ = require('lodash'),
  board = board = new five.Board();


board.on("ready", function() {
  var myLed = new five.Led(13);
  var currentVoltage = 0;

  var flasher = _.throttle(function () {
    console.log('strobing', currentVoltage);
    myLed.stop().off();
    myLed.strobe(currentVoltage);
  }, 500);

  this.analogRead(0, function (voltage) {
    if (currentVoltage !== voltage) {
      var drop = currentVoltage - voltage > 1
      var spike = voltage - currentVoltage > 1;

      if (drop || spike) flasher();

      currentVoltage = voltage;
    }
  });
});
