const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const zip = require("gulp-zip");
const browserSync = require("browser-sync");
const nodemon = require("gulp-nodemon");

// gulp plugins and utils
// const gutil = require('gulp-util');
// const livereload = require('gulp-livereload');
// const nodemon = require('gulp-nodemon');
// const postcss = require('gulp-postcss');
// const sourcemaps = require('gulp-sourcemaps');

// postcss plugins
// const autoprefixer = require('autoprefixer');
// const colorFunction = require('postcss-color-function');
// const cssnano = require('cssnano');
// const customProperties = require('postcss-custom-properties');
// const easyimport = require('postcss-easy-import');

// const swallowError = function swallowError(error) {
//     gutil.log(error.toString());
//     gutil.beep();
//     this.emit('end');
// };

// const nodemonServerInit = function () {
//     livereload.listen(1234);
// };

// gulp.task('build', ['css'], function (/* cb */) {
//     return nodemonServerInit();
// });

// gulp.task('watch', function () {
//     gulp.watch('assets/css/**', ['css']);
// });

gulp.task("sass", () => {
    return gulp
        .src("./styles/styles.scss")
        .pipe(
            sass({
                outputStyle: "compressed",
            }).on("error", sass.logError),
        )
        .pipe(
            autoprefixer({
                browsers: "last 3 versions",
            }),
        )
        .pipe(gulp.dest("./assets/styles"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", () => {
    gulp.watch("./styles/**/*", ["sass"]);
});

gulp.task("zip", ["sass"], () => {
    const targetDir = "dist/";
    const themeName = require("./package.json").name;
    const filename = themeName + ".zip";

    return gulp
        .src(["**", "!node_modules", "!node_modules/**", "!dist", "!dist/**"])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task("transfer", () => {
    return gulp
        .src("./**/*")
        .pipe(gulp.dest("../../../../dscvrr-blog-prod/content/themes/discoverer"))
})

// gulp.task('default', ['build'], function () {
//     gulp.start('watch');
// });

const bsDelay = 500;

gulp.task("nodemon", function(cb) {
    let called = false;
    return nodemon({
        script: "../../../current/index.js",
        watch: "../../../content/themes/discoverer",
        ext: "hbs js",
    })
        .on("start", function onStart() {
            if (!called) {
                cb();
            }
            called = true;
        })
        .on("restart", function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false,
                });
            }, bsDelay);
        });
});

gulp.task("browser-sync", ["nodemon"], () => {
    browserSync({
        proxy: "http://localhost:2369",
        port: 4444,
        ghostMode: false,
    });
});

gulp.task("js", () => {
    return gulp.src("assets/**/*.js");
});

gulp.task("bs-reload", () => {
    browserSync.reload();
});

gulp.task("default", ["browser-sync"], () => {
    gulp.watch("assets/**/*.js", ["js", browserSync.reload]);
    gulp.watch("assets/**/*.css", ["sass"]);
    gulp.watch("assets/**/*.html", ["bs-reload"]);
});
