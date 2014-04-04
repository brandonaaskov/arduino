var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();

board.on("ready", function() {

  var myLed = new five.Led(13);
  myLed.blink(1000);

});
