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
  currentVoltage = 0

  my.arduino.analogRead 0, (voltage) ->
    return unless voltage isnt currentVoltage
    currentVoltage = voltage
    delay = voltage/1000

    my.led.turnOn()
    after delay.seconds(), -> my.led.turnOff()


robot = Cylon.robot config
robot.start()