var five = require('johnny-five'),
    board = new five.Board();

board.on('ready', function() {
  var myLed = new five.Led(13);
  myLed.blink(1000);
});
