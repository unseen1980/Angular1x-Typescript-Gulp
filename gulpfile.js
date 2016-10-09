var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
});

gulp.task('tsc', ['copy-html'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['tsc', 'browserSync'], function () {
    gulp.watch('src/*.ts', ['tsc']);
    gulp.watch('dist/*.js', browserSync.reload);
});