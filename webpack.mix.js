const webpack = require("webpack");
const mix = require("laravel-mix");
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const fileInclude = require("gulp-file-include");
require("laravel-mix-polyfill");
require("custom-env").env("", "./");

mix.webpackConfig({
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      wNumb: "wnumb",
      "window.jQuery": "jquery",
    })
  ]
});

function fileincludeRun() {
  gulp
    .src(["resources/html/*.html"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("./public/"));
}

mix.options({
  postCss: [
    require("autoprefixer")({
      browsers: ["last 1 versions", "ie 10"],
      cascade: false
    })
  ]
});

mix
  .js("resources/js/app.js", "public/js/app.js")
  .polyfill({
    enabled: true,
    useBuiltIns: "usage",
    targets: { ie: 10 }
  })
  .then(function() {
    gulp.parallel(fileincludeRun)();
  })
  .disableNotifications();

mix
  .sass("resources/sass/app.scss", "public/css/app.css")
  .then(function() {
    gulp.parallel(fileincludeRun)();
  })
  .disableNotifications();

mix.copy('resources/images/*', 'public/images')
  .disableNotifications();

mix.copy('resources/fonts/*', 'public/fonts')
  .disableNotifications();

browserSync.init({
  proxy: false,
  server: {
    baseDir: "./public"
  },
  port: 2010,
  open: false,
  files: [
    "public/**/*.css",
    "public/**/*.js",
    "resources/html/**/*.html",
  ],
  // notify: false,
  callbacks: {
    ready: function(err, bs) {
      bs.emitter.on("file:changed", function() {
        gulp.parallel(fileincludeRun)();
      });
    }
  }
});

mix.options({
  processCssUrls: false
});

//versionning
if (mix.inProduction()) {
  // mix.version();
}
