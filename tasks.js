var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var webfolder = "web/";

module.exports = function( gulp, folder, sourcefolder ){
    if( !folder ){
        folder = "admintheme";
    }

    if( !sourcefolder ){
        sourcefolder = "vendor/recognize/adminthemebundle/Recognize/AdminThemeBundle/Resources/";
    }

    console.log( folder );

    gulp.task('default-theme-sass', function() {
        gulp.src(sourcefolder + "theme/scss/base.standard.scss")
            .pipe(sass())
            .pipe(concat('theme.css'))
            .pipe(gulp.dest(webfolder + folder + "/css"));
    });

    gulp.task('default-theme-js', function() {
        return gulp.src(sourcefolder + 'theme/js/*.js')
            .pipe(concat('theme.js'))
            .pipe(gulp.dest(webfolder + folder + "/js"));
    });

    gulp.task('default-theme-move-css', function(){
        return gulp.src(sourcefolder + "public/css/*")
            .pipe(gulp.dest(webfolder + folder + "/css"));
    });

    gulp.task('default-theme-move-js', function(){
        return gulp.src(sourcefolder + "public/js/*")
            .pipe(gulp.dest(webfolder +  folder + "/js"));
    });

    gulp.task('default-theme-move-images', function(){
        return gulp.src(sourcefolder + "theme/images/default/*")
            .pipe(gulp.dest(webfolder +  folder + "/images"));
    });

    gulp.task('default-theme-move-vendors', function(){
        return gulp.src(sourcefolder + "public/vendor/*/*")
            .pipe(gulp.dest(webfolder +  folder));
    });

    gulp.task('default-theme-move', ['default-theme-move-vendors', 'default-theme-move-css', 'default-theme-move-js', 'default-theme-move-images']);

    gulp.task('default-theme', ['default-theme-sass', 'default-theme-js', 'default-theme-move']);
    return gulp;
};