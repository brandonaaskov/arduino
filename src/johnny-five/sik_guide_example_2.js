var five = require('johnny-five'),
  _ = require('lodash'),
  board = board = new five.Board();


board.on("ready", function() {
  var myLed = new five.Led(13);
  var currentVoltage = 0;

  /*
  Since the analogRead() method gets called several times a second, we throttle
  it here so that it doesn't attempt to turn off and then strobe our led too
  much. We're only throttling to 500ms so that there also isn't a noticeable
  delay in the real world.
  */
  var flasher = _.throttle(function () {
    console.log('strobing', currentVoltage);
    myLed.stop().off();
    myLed.strobe(currentVoltage);
  }, 500);

  this.analogRead(0, function (voltage) {
    if (currentVoltage !== voltage) {
      /*
      depending on the position of the pot, it can "flicker" between two values
      so these two variables give us a threshold of +/- 1. If the change is
      greater than that, then we fun the flasher() method.
      */
      var drop = currentVoltage - voltage > 1
      var spike = voltage - currentVoltage > 1;

      if (drop || spike) flasher();

      currentVoltage = voltage;
    }
  });
});
