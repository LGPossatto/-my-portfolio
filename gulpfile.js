const { src, dest, series } = require("gulp");

const htmlmin = require("gulp-htmlmin");

const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");

const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const handleHTML = () => {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("dist/"));
};

const handleSass = () => {
  return src("src/styles/**/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css"));
};

const handleIndexJs = () => {
  return src([
    "src/js/index/toggleBtn.js",
    "src/js/index/typewriter.js",
    "src/js/index/copyTo.js",
    "src/js/index/parallaxEffect.js",
    "src/js/index/projectsSection.js",
  ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"));
};

const handleEditJs = () => {
  return src("src/js/edit/*.js")
    .pipe(concat("edit.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"));
};

exports.default = series(handleHTML, handleSass, handleIndexJs, handleEditJs);
