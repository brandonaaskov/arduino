var _ = require('lodash'),
  through = require('through'),
  gulp = require('gulp'),
  exec = require('gulp-exec'),
  plumber = require('gulp-plumber'),
  paths = {
    scripts: ['*.js']
  };

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['reload']);
});

// prevents the other end of the pipe from getting bombarded with reload requests
var flakJacket = through(function (buf) {
  var stream = this;

  if (stream.paused) {
    return;
  }
  else {
    console.log('pausing');
    stream.emit('data', buf);
    stream.pause();

    setTimeout(function () {
      console.log('resuming');
      stream.resume();
    }, 1500);
  }

});

gulp.task('reload', function () {
  var options = {
    silent: false,
    continueOnError: true, // default: false
  };

  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(exec('echo "hello"'))
    .pipe(flakJacket)
    .pipe(exec('echo "world"'))
    // .pipe(exec('node sik_guide_example_2.js > arduino.log 2> arduino-error.log', options));
});

// runs a build and launches a server
gulp.task('default', ['reload', 'watch']);
