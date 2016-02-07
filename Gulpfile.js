var gulp    = require('gulp');
var gutil   = require('gulp-util');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var todo    = require('gulp-todoist');
var path    = require('path');
var yargs   = require('yargs').argv;
var tpl     = require('gulp-template');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var filesize = require('gulp-filesize');
var eslint  = require('gulp-eslint');
var jscs    = require('gulp-jscs');
var clean   = require('gulp-clean');
var KarmaServer = require('karma').Server;

var paths = {
  entry: 'client/app/app.js',
  app: ['client/app/**/*.{js,scss,html}', 'client/stylesheets/**/*.{scss,css}'],
  js: ['client/app/**/*.js', '!client/app/**/*.spec.js'],
  allJS: ['client/**.js', '!client/app/lib/**.js', 'client/..'],
  scss: ['client/app/**/*.scss', 'client/style/**/*.scss'],
  toCopy: ['client/index.html', 'client/favicon.ico'],
  html: ['client/index.html', 'client/app/**/*.html'],
  dest: 'dist',
  templates: {
    component: 'templates/component/*.**',
    service: 'templates/service/*.**'
  },
  bundledJS: 'dist/bundle.js'
};

// TODO: Create Gulp task to add all files, commit, and push
  // Include hard-lint and hard-test as pre-reqs
  // prep:prod should run as well
  // Note: Add this as a `$ npm` command
  // (similar to `$ npm start` runs `$ gulp`)

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({ silent: false, verbose: true }))
    .on('error', gutil.log);
});

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('hard-lint', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('soft-lint', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('jscs', function() {
  return gulp.src('**.js')
    .pipe(jscs())

    // Currently autofix is not working
    // .pipe(jscs({ fix: true })) // Once the rules are ready to be finalized
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'client' })
    .pipe(gulp.dest(paths.dest))
    .on('error', gutil.log);
});

gulp.task('clean', function() {
  return gulp.src(paths.dest, { read: false })
    .pipe(clean());
});


// TODO: Set it up so that it watches new files
// Currently have to restart the server when adding a new file
gulp.task('build', ['soft-lint', 'todo', 'copy'], function() {
  return gulp.src(paths.js)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest))
    .on('error', gutil.log);
});

gulp.task('serve', function() {
  browser.init({
    proxy: 'http://localhost:5000',
    ghostMode: false,
    open: false
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.app, ['soft-lint', 'build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

gulp.task('component', function() {
  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.templates.component)
    .pipe(tpl({
      dottedName: name,
      spineCaseName: spineCase(name),
      titleCaseName: titleCase(name),
      camelCaseName: camelCase(name),

      // The following are needed because the templating engine returns an error
      // when using ES6 interpolation
      vmPropName: '`vm.${prop.name}`'
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('component', name);
    }))
    .pipe(gulp.dest(destPath))
    .on('error', gutil.log);
});

gulp.task('service', function() {
  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToSharedServices(), parentPath, name);

  return gulp.src(paths.templates.service)
    .pipe(tpl({
      dottedName: name,
      spineCaseName: spineCase(name),
      titleCaseName: titleCase(name),
      camelCaseName: camelCase(name),

      // The following are needed because the templating engine returns an error
      // when using ES6 interpolation
      urlBase: '`${url.base}`'
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('service', name);
      console.log('***************************************');
      console.log('IMPORTANT!');
      console.log('Remember to add service to a module such as SharedServices');
      console.log('***************************************');
    }))
    .pipe(gulp.dest(destPath))
    .on('error', gutil.log);
});

gulp.task('default', function(done) {
  sync('build', 'serve', 'watch', done);
});


gulp.task('minify', function() {
  return gulp.src(paths.bundledJS)
    .pipe(filesize())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest))
    .pipe(filesize())
    .on('error', gutil.log);
});

gulp.task('print-minified-size', function() {
  return gulp.src(paths.bundledJS)
    .pipe(filesize())
    .on('error', gutil.log);
});

// TODO: Confirm that sourcemaps aren't pushed to production
gulp.task('prep:prod', function() {
  sync(
    'test',
    'hard-lint',
    'jscs',
    'clean',
    'build',
    'minify',
    'print-minified-size'
  );
});

gulp.task('serve:prod', function(done) {
  sync('prep:prod', 'serve', done);
});


///// HELPER FUNCTIONS /////////////////////////////////////////////////////////
function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function spineCase(val) {
  return val.split('.').join('-');
}

function titleCase(val) {
  var parts = val.split('.');
  var i = 0;

  for (i; i < parts.length; i++) {
    parts[i] = cap(parts[i]);
  }

  return parts.join('');
}

function camelCase(val) {
  var titleized = titleCase(val);
  return titleized.charAt(0).toLowerCase() + titleized.slice(1);
}

function resolveToComponents(glob) {
  glob = glob || '';

  // app/components/{glob}
  return path.join('client', 'app/components', glob);
}

function resolveToSharedServices(glob) {
  glob = glob || '';

  // app/shared/services/{glob}
  return path.join('client', 'app/shared/services', glob);
}
