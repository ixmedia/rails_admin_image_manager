// The development server (the recommended option for development)
var gulp          = require("gulp");
var gutil         = require("gulp-util");

gulp.task("default", ["app-styles", "webpack:build-dev", "watch"]);
gulp.task("init", ["app-styles", "webpack:build-dev"]);
