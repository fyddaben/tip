// jscs: disable
var combiner = require('stream-combiner2');

var gulp = require('gulp');

var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var rename = require('gulp-rename');

var minifyCSS = require('gulp-minify-css');

var paths = {
  scripts: ['src/*.js'],
  sass: ['src/*.scss'],
  destScripts:'public/js',
  destLess:'public/css'
};

gulp.task('scripts', function () {

    var combined = combiner.obj([
        gulp.src(paths.scripts),
        uglify(),
        rename(function(path){
            path.extname = '.min.js';
        }),
        gulp.dest(paths.destScripts)
    ]);
    combined.on('error', console.error.bind(console));
    return combined;

});
gulp.task('sass', function(){

  var combined = combiner.obj([
      gulp.src(paths.sass), 
      sass(),
      minifyCSS(),
      rename(function(path) {
          path.extname = '.min.css';
      }),
      gulp.dest(paths.destLess)

  ]);
  combined.on('error', console.error.bind(console));
  return combined;
});

gulp.task('watch', function () {

  gulp.watch(paths.scripts, ['scripts']);
   
  gulp.watch(paths.sass, ['sass']);
  
});
     
gulp.task('default', ['scripts','sass','watch']);
    

