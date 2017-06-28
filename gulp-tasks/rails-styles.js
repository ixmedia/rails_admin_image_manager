var gulp          = require("gulp");
var gutil         = require("gulp-util");
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');

gulp.task('app-styles', function() {
  gulp.src('./app/assets/stylesheets/rails_admin_image_manager/**/*.+(sass|scss)')
    .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 5 version'))
    .pipe(rename(function (path) {
      path.extname = ".css.erb";
    }))
    .pipe(gulp.dest('./app/assets/stylesheets/rails_admin_image_manager/'));
})
