var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var webfolder = "web/";
var defaultfolder = "vendor/recognize/adminthemebundle/Recognize/AdminThemeBundle/Resources/";

module.exports = function( gulp ){
    gulp.task('default-theme-sass', function() {
        gulp.src(defaultfolder + "theme/scss/base.standard.scss")
            .pipe(sass())
            .pipe(concat('theme.css'))
            .pipe(gulp.dest(defaultfolder + "public/css"));
    });

    gulp.task('default-theme-js', function() {
        return gulp.src(defaultfolder + 'theme/js/*.js')
            .pipe(concat('theme.js'))
            .pipe(gulp.dest(webfolder + "admintheme/js"));
    });

    gulp.task('default-theme-move-css', function(){
        return gulp.src(defaultfolder + "public/css/*")
            .pipe(gulp.dest(webfolder + "admintheme/css"));
    });

    gulp.task('default-theme-move-js', function(){
        return gulp.src(defaultfolder + "public/js/*")
            .pipe(gulp.dest(webfolder + "admintheme/js"));
    });

    gulp.task('default-theme-move-images', function(){
        return gulp.src(defaultfolder + "theme/images/default/*")
            .pipe(gulp.dest(webfolder + "admintheme/images"));
    });

    gulp.task('default-theme-move-vendors', function(){
        return gulp.src(defaultfolder + "public/vendor/*/*")
            .pipe(gulp.dest(webfolder + "admintheme"));
    });

    gulp.task('default-theme-move', ['default-theme-move-vendors', 'default-theme-move-css', 'default-theme-move-js', 'default-theme-move-images']);

    gulp.task('default-theme', ['default-theme-sass', 'default-theme-js', 'default-theme-move']);
    return gulp;
};