var gulp        = require("gulp"),
    minifyCss   = require("gulp-minify-css"),
    react       = require("gulp-react"),
    uglify      = require("gulp-uglify"),
    rev         = require("gulp-rev"),
    del         = require("del"),
    plumber     = require("gulp-plumber"),
    usemin      = require("gulp-usemin"),
    htmlmin     = require("gulp-htmlmin"),
    less        = require("gulp-less"),
    jshint      = require('gulp-jshint'),
    livereload  = require('gulp-livereload');

var src = {
    root: "./frontend/",
    html: "./frontend/**//*.html",
    js: "./frontend/static/js/",
    jsx: "./frontend/static/jsx/",
    css: "./frontend/static/css/",
    less: "./frontend/static/less/",
    img: "./frontend/static/img/"
};

var dest = {
    root: "./templates/",
    html: "./templates/",
    css: "./templates/static/css/",
    js: "./templates/static/js/",
    jsx: "./frontend/static/jsx/js",
    img: "./templates/static/img/"
};

gulp.task("clean", function() {
    del([dest.root, src.css, dest.jsx], function (err, paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
});

gulp.task("copy-img", function() {
    return gulp.src(src.img+"**/*")
        .pipe(gulp.dest(dest.img));
});

gulp.task("js", function() {
    return gulp.src(src.js+"*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(gulp.dest(dest.js));
});

gulp.task("jsx", function() {
    return gulp.src(src.jsx+"*.jsx")
        .pipe(react())
        .pipe(gulp.dest(dest.jsx));
});

gulp.task("js-prod", function() {
    return gulp.src(src.js+"*.js")
        .pipe(uglify())
        .pipe(gulp.dest(dest.js));
});

gulp.task("less", function() {
    return gulp.src(src.less+"style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(src.css))
        .pipe(gulp.dest(dest.css))
        .pipe(livereload());
});

gulp.task("less-prod", function() {
    return gulp.src(src.less+"style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(src.css));
});

gulp.task("usemin", ["less", "jsx"], function() {
    return gulp.src([src.html])
        .pipe(plumber())
        .pipe(usemin({
            css: [],
            html: [],
            js: ['concat']
        }))
        .pipe(gulp.dest(dest.html))
        .pipe(livereload());
});

gulp.task("usemin-prod", ["less-prod", "copy-img", "jsx"], function() {
    return gulp.src(src.html)
        .pipe(plumber())
        .pipe(usemin({
            css: [rev()],
            html: [htmlmin({
                removeComments: true,
                removeCommentsFromCDATA: true
            })],
            js: [uglify({mangle: false}), rev()]
        }))
        .pipe(gulp.dest(dest.html));
});

gulp.task("htmlmin", ["usemin-prod"], function() {
    return gulp.src(dest.html + "**//*.html")
        .pipe(htmlmin({
            removeComments: true,
            removeCommentsFromCDATA: true
        }))
        .pipe(gulp.dest(dest.html));
});

gulp.task("cssmin", ["htmlmin"], function() {
    return gulp.src(dest.css+"*.css")
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(dest.css));
});

gulp.task("watch", ["copy-img", "usemin"], function() {
    livereload.listen({
        port: 35729,
        start: true
    });
    console.info('Livereload on PORT '+livereload.options.port);
    gulp.watch(src.html, ["usemin"]);
    gulp.watch(src.jsx+"*.jsx", ["usemin"]);
    gulp.watch(src.less+"*.less", ["less"])
    gulp.watch(src.js+"*.js", ["js"])
});

gulp.task("prod", ["cssmin"]);
gulp.task("default", ["watch"]);
