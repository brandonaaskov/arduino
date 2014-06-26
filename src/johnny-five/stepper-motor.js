var five = require('johnny-five'),
    _ = require('underscore')
    board = new five.Board()

board.on('ready', function() {
  var pins = {
    direction: new five.Pin(11),
    step: new five.Pin(12),
    ms1: new five.Pin(9),
    ms2: new five.Pin(8),
    sleep: new five.Pin(7)
  }

  pins.direction.high()
  pins.step.high()
  pins.ms1.high()
  pins.ms2.high()
  pins.sleep.high()

  var stepsPerRevolution = 200

  var turnMotor = function (mode) {
    changeMode(mode)
    pins.sleep.high()

    for(var i = 0; i < stepsPerRevolution; i++) {
      pins.step.low()
      pins.step.high()
    }

    pins.sleep.low()
  }

  var changeDirection = function (direction) {
    var clockwise = direction.toLowerCase() === 'clockwise' || direction.toLowerCase() === 'cw'
    (clockwise) ? pins.direction.low() : pins.direction.high()
  }

  var changeMode = function (mode) {
    switch (mode.toLowerCase()) {
      case 'full':
        pins.ms1.low()
        pins.ms2.low()
        break
      case 'half':
        pins.ms1.high()
        pins.ms2.low()
        break
      case 'quarter':
        pins.ms1.low()
        pins.ms2.high()
        break
      case 'eighth':
        pins.ms1.high()
        pins.ms2.high()
        break
    }
  }

  this.loop(100, function () {
    turnMotor('full')
  })
})

