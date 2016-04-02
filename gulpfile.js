var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    stream = browserSync.stream;

gulp.task("slidejs", function() {
    gulp.src("slide.js")
        .pipe(stream())
});

gulp.task("slidesass", function() {
    return sass("slide.sass")
        .pipe(gulp.dest("./"))
        .pipe(stream())
});

gulp.task("default", function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("slide.js", ["slidejs"]);
    gulp.watch("slide.sass", ["slidesass"]);
    gulp.watch("index.html", reload);
})
