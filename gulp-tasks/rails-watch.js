var gulp          = require("gulp");
gulp.task('watch', function(){
  gulp.watch('./app/assets/stylesheets/rails_admin_image_manager/**/*.+(sass|scss)', ['admin-styles']);
  gulp.watch('./app/assets/javascripts/rails_admin_image_manager/**/*.+(js|vue)', ["webpack:build-dev"]);
})
