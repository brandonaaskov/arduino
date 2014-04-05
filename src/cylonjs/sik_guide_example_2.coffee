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
  my.arduino.analogRead 0, (voltage) ->
    console.log 'voltage', voltage
#    after (voltage).seconds(), -> my.led.toggle()
    my.led.brightness()

robot = Cylon.robot config
robot.start()