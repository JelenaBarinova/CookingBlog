var gulp = require("gulp");
var plug = require("gulp-load-plugins")();

gulp.task('build', function () {
  return gulp
    .src('./index.html')
    .pipe(plug.rename('index.html'))
    .pipe(plug.usemin({
      app: [plug.ngAnnotate({add: true, single_quates: true}), plug.uglify(), plug.rev()],
      theme: [plug.uglify(), plug.rev()],
      style: [plug.minifyCss(), 'concat', plug.rev()]
    }))
    .pipe(gulp.dest('./build/'))
    .on('error', plug.util.log);
});

gulp.task('clean', function () {
  return gulp.src('./build/', {read: false})
    .pipe(plug.clean());
});

gulp.task('prep-data', function () {
  return gulp
    .src(['./data/recipes/*.json'])
    .pipe(plug.jsonmin())
    .pipe(gulp.dest('./build/data/recipes/'));
});

gulp.task('prep-img', function () {
  return gulp
    .src('./images/recipes/*')
    .pipe(plug.imageResize({ 
      width : 400,
      height : 400,
      crop : false,
      upscale : false
    }))
    .pipe(plug.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./build/images/recipes'));
});

gulp.task('copy-img', function() {
  return gulp.src(['./images/*'])
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(['./fonts/**'])
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('copy-partials', function() {
  return gulp.src(['./partials/**'])
    .pipe(gulp.dest('./build/partials/'));
});

gulp.task('copy-styles', function() {
  return gulp.src(['./css/**/*'])
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('publish', function() {
  return gulp.src(['./build/**/*'])
    .pipe(plug.ghPages());
});

gulp.task('open', function(){
  return gulp.src('./index.html')
    .pipe(plug.open('', {app: 'google chrome', url: 'http://jelenabarinova.github.io/CookingBlog'}));
});

gulp.task('deploy', function(cb) {
  plug.runSequence('clean', ['build', 'prep-data', 'prep-img', 'copy-img', 'copy-fonts', 'copy-partials', 'copy-styles'], 'publish', 'open', cb);
});