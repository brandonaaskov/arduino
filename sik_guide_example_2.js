var _ = require('lodash');
var jfive = require('johnny-five');
var board = new jfive.Board();


board.on("ready", function() {
  var softPot = new jfive.Pin('A0');
  var led = new jfive.Pin(13)

  var turnOff = function () {
    led.low()
  };

  var turnOn = function () {
    led.high();
  };

  this.analogRead(0, function(delay) {
    board.wait(delay, function () {
      turnOn();

      board.wait(delay, function () {
        turnOff();
      });

    });
  });
});
