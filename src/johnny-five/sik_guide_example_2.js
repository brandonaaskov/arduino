var five = require('johnny-five'),
  board = board = new five.Board();


board.on("ready", function() {
  var myAnalogPin = new five.Pin('A0');
  var myLed = new five.Led(13);
  var currentVoltage = 0;
  var board = this;

  board.analogRead(0, function(voltage) {
    //delay and turn on
    board.wait(voltage, function () {
      console.log('on');
      board.digitalWrite(13, 1);

      //delay and turn off
      board.wait(voltage, function () {
        console.log('off');
        board.digitalWrite(13, 0);
      });
    });
  });
});
