Cylon = require("cylon")

config =
  connection:
    name: "arduino"
    adaptor: "firmata"
    port: "/dev/tty.usbmodem1a12151"

  device:
    name: "led"
    driver: "led"
    pin: 13

config.work = (my) ->
  time = 1.second()
  every time, ->
    my.led.toggle()

robot = Cylon.robot config
robot.start()