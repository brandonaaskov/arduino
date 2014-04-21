// Generated by CoffeeScript 1.7.1
var Cylon, config, robot;

Cylon = require("cylon");

config = {
  connection: {
    name: "arduino",
    adaptor: "firmata",
    port: "/dev/tty.usbmodem1a12151"
  },
  device: {
    name: "led",
    driver: "led",
    pin: 13
  }
};

config.work = function(my) {
  var time;
  time = 1..second();
  return every(time, function() {
    return my.led.toggle();
  });
};

robot = Cylon.robot(config);

robot.start();
