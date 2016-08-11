var gulp = require('gulp'),
    minify = require('gulp-minify'),
    browserify  = require('gulp-browserify');


    var ngAnnotate = require('gulp-ng-annotate');
    var gp_uglify = require('gulp-uglify');
    var gp_concat = require('gulp-concat');
    var gp_rename = require('gulp-rename');
    var ngmin = require('gulp-ngmin');
/*
* Assets Path
**/
var pathDist = "../";


/*
* Start Nodejs express for testing
**/

gulp.task('compress', function() {

    gulp.src([ pathDist +'/js/main.js'])
      //.pipe(gp_concat('js/app.js'))
      .pipe(gulp.dest(pathDist+'js'))
      .pipe(gp_rename('main.js'))
      .pipe(ngAnnotate())
      //.pipe(ngmin({dynamic: true}))
      .pipe(gp_uglify({
        options : {
          mangle : false,
          compress:{
            pure_funcs: [ 'console.log' ]
          }
        },
        mangle  :false,
        compress:{
            pure_funcs: [ 'console.log' ]
        }
      }))
      .pipe(gulp.dest( pathDist + '/js'));

      return gulp;

});

gulp.task('browserify'  ,function(){
  gulp.src('./js/main.js')
      .pipe(browserify())
      .on('error' , function(err){
        console.log(err);
      })
      .pipe(gulp.dest(pathDist + '/js'));
});



gulp.task('watch' , function(){
  gulp.watch('./**/*.js' , ['browserify']).on('change' , function(){});
});

gulp.task('default' , ['browserify'   , 'watch']);
