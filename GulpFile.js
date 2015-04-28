var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('Resources/theme/scss/*.scss')
        .pipe(sass())
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('Resources/public/css'));
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

gulp.task('watch', function() {
    gulp.watch('Resources/js/*.js', ['scripts']);
    gulp.watch('Resources/theme/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass'] );