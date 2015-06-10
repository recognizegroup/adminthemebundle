var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var webfolder = "../../../web/";

gulp.task('sass', function() {
    gulp.src('Resources/theme/scss/vendor/bootstrap.scss')
        .pipe(sass())
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest(webfolder + "admintheme/css"));

    gulp.src('Resources/theme/scss/base.standard.scss')
        .pipe(sass())
        .pipe(concat('theme.css'))
        .pipe(gulp.dest(webfolder + "admintheme/css"));

});

gulp.task('js', function() {
    return gulp.src('Resources/theme/js/*.js')
        .pipe(concat('theme.js'))
        .pipe(gulp.dest(webfolder + "admintheme/js"));
});

gulp.task('images', function() {
    return gulp.src('Resources/public/images/*')
        .pipe(gulp.dest(webfolder + "admintheme/images"));
});


gulp.task('vendors', function() {
    return gulp.src('Resources/public/vendor/*/*')
        .pipe(gulp.dest(webfolder + "admintheme"));
});

gulp.task('watch', function() {
    gulp.watch('Resources/js/*.js', ['scripts']);
    gulp.watch('Resources/theme/scss/*.scss', ['sass']);
});

gulp.task('test', function() {
    var jasmine = require('gulp-jasmine');
    var jasmine_spec_reporter = require('jasmine-spec-reporter');

    return gulp.src('Tests/Resources/*Test.js')
        .pipe(jasmine({
            reporter: new jasmine_spec_reporter()
        })
    );
});

gulp.task("theme", ['vendors', 'sass', 'js', 'images']);
gulp.task('default', ['sass'] );