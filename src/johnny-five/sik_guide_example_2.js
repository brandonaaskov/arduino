var five = require('johnny-five'),
  board = board = new five.Board();


board.on("ready", function() {
  var myAnalogPin = new five.Pin('A0');
  var myLed = new five.Led(13);
  var currentVoltage = 0;

  myLed.strobe(currentVoltage);

  myAnalogPin.read(function (voltage) {
    setTimeout(function () {
      myLed.off();
    }, voltage);

    setTimeout(function () {
      myLed.on();
    }, voltage);
  });
});
