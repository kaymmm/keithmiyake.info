/*jslint node: true */

'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var spawn = require('child_process').spawn;
var argv = require('yargs').argv;
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var del = require('del');
var browserSync = require('browser-sync');
var commandExists = require('command-exists');
var yaml = require('js-yaml');
var fs = require('fs-extra');

try {
  var config = yaml.safeLoad(fs.readFileSync('_config.yml','utf-8'));
} catch (e) {
  console.log('ERROR: Could not load your jekyll _config.yml');
  console.log(e);
}

var url = 'localhost';
var port = '3000';
var output = '_site';
var baseurl = (config.baseurl !== null) ? config.baseurl : '';
var dirs = {
  js: 'assets/js',
  sass: '_sass',
  css: 'assets/css',
  img: 'assets/img_src',
  imgc: 'assets/img',
  dest: (baseurl !== '') ? output + baseurl : output,
};

var isProduction = argv.prod;
if (isProduction) {
  console.log("Production Mode");
} else {
  console.log("Development Mode");
}

var htmlProoferParams = [
  dirs.dest,
  '--allow-hash-href',
  '--check-html',
  '--disable-external',
  // '--file-ignore', '/asam210/,/geh101/',
  // '--url-ignore','scholar.google.com',
];

gulp.task('clean:assets', function () {
  return del([
    dirs.js + '/*.min.js',
    '!' + dirs.js + '/vendor',
    dirs.css + '/*.map',
    dirs.css + '/*.css',
    '!' + dirs.css + '/vendor',
    dirs.imgc + '/**/*/',
  ]);
});
gulp.task('clean:styles', function () {
  return del([
    dirs.dest + '/' + dirs.css + '/main.min.css',
    dirs.css + '/main.min.css'
  ]);
});
gulp.task('clean:vendorstyles', function () {
  return del([
    dirs.dest + '/' + dirs.css + '/vendor.min.css',
    dirs.css + '/vendor.min.css'
  ]);
});
gulp.task('clean:scripts', function () {
  return del([
    dirs.dest + '/' + dirs.js + '/main.min.js',
    dirs.js + '/main.min.js'
  ]);
});
gulp.task('clean:vendorscripts', function () {
  return del([
    dirs.dest + '/' + dirs.js + '/vendor.min.js',
    dirs.js + '/vendor.min.js'
  ]);
});
gulp.task('clean:images', function () {
  return del([dirs.dest + '/' + dirs.imgc + '**/*']);
});
gulp.task('clean:jekyll', function () {
  return del([
    dirs.dest + '/**/*',
    '!' + dirs.dest,
    '!' + dirs.dest + '/assets',
    '!' + dirs.dest + '/assets/**/*'
  ]);
});

gulp.task('clean', function () {
  return del([
    output + '/**/*',
    '!' + output
  ]);
});

gulp.task('images', ['clean:images'], function () {
  return gulp.src([dirs.img + '/**/*'])
    .pipe($.plumber({
      handleError: function (err) {
        // console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.newer(dirs.imgc + '/**/*'))
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]
    }))
    .pipe(gulp.dest(dirs.imgc))
    .pipe(gulp.dest(dirs.dest + '/' + dirs.imgc + '/'));
});

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var jekyllInc = 0;

gulp.task('jekyll', ['clean:jekyll'], function (done) {
  return commandExists('bundle', function (err, commandExists) {
    var jekyllCmd = jekyll;
    var jekyllParams = ['build'];
    jekyllParams.push('--destination', dirs.dest);
    if (baseurl !== "") {
      jekyllParams.push('--baseurl',baseurl);
    }
    if (!isProduction) {
      jekyllParams.push('--drafts');
    }
    if (jekyllInc) {
      jekyllParams.push('--incremental');
    }
    if (err) {
      console.log(err);
      browserSync.notify(err);
      done();
    } else {
      if (commandExists) {
        jekyllCmd = 'bundle';
        jekyllParams.unshift('exec', jekyll);
      }
      browserSync.notify('Building Jekyll');
      spawn(jekyllCmd, jekyllParams, {stdio: 'inherit'})
      .on('exit', function (code) {
        if (code !== 0) {
          console.log('ERROR: Jekyll process exited with code: ' + code);
          this.emit('end');
        }
        done();
      });
    }
  });
});

gulp.task('jekyll:incremental', function () {
  jekyllInc = 1;
  gulp.start('jekyll')
  .on('end', function () {
    console.log('end');
    browserSync.reload();
  });
});

// 'gulp lint:scripts' -- check your JS for formatting errors using XO Space
gulp.task('lint:scripts', function () {
  gulp.src([
    dirs.js + '/main.js',
    // dirs.js + '#<{(||)}>#*.js',
    '!' + dirs.js + '/**/*.min.js'
  ])
  .pipe($.plumber({
    handleError: function (err) {
      // console.log(err);
      this.emit('end');
    }
  }))
  // .pipe($.eslint())
  // .pipe($.eslint.formatEach())
  // .pipe($.eslint.format())
  // .pipe($.eslint.failAfterError());
});

// 'gulp lint:styles' -- check your SASS for formatting errors
gulp.task('lint:styles', function () {
  gulp.src([
    dirs.css + '/main.scss'
  ])
  .pipe($.plumber({
    handleError: function (err) {
      // console.log(err);
      this.emit('end');
    }
  }))
  .pipe($.sassLint())
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});

// 'gulp lint:html' -- check your html/md for errors and verify links
gulp.task('lint:html', function (done) {
  commandExists('bundle', function (err, commandExists) {
    var proofCmd = 'bundle';
    if (err) {
      // console.log(err);
      browserSync.notify(err);
      done();
    } else {
      if (commandExists) {
        htmlProoferParams.unshift('exec', 'htmlproofer');
      } else {
        proofCmd = 'htmlproofer';
      }
      browserSync.notify('Linting HTML');
      spawn(proofCmd, htmlProoferParams, {stdio: 'inherit'})
      .on('exit', function (code) {
        if (code === 0) {
          done();
        } else {
          console.log('ERROR: htmlproofer process exited with code: ' + code);
          this.emit('end');
        }
      });
    }
  });
});

gulp.task('scripts', ['clean:scripts'], function () {
  return gulp.src(dirs.js + '/main.js')
    .pipe($.plumber({
      handleError: function (err) {
        // console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.concat('main.min.js'))
    .pipe($.if(isProduction, $.uglify({preserveComments: 'some'})))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    // .pipe($.if(isProduction, $.gzip({append: false})))
    .pipe(gulp.dest(dirs.js))
    .pipe(gulp.dest(dirs.dest + '/' + dirs.js))
    .pipe($.if(!isProduction, browserSync.stream()));
});

gulp.task('scripts:vendor', ['clean:vendorscripts'], function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    dirs.js + '/plugins/**/*.js'
  ])
    .pipe($.plumber({
      handleError: function (err) {
        // console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.concat('vendor.js'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.if(isProduction, $.if('*.js', $.uglify({preserveComments: 'some'}))))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    .pipe($.if(isProduction, gulp.dest(dirs.js)))
    // .pipe($.if(isProduction, $.if('*.js', $.gzip({append: true}))))
    .pipe(gulp.dest(dirs.js))
    .pipe(gulp.dest(dirs.dest + '/' + dirs.js))
    .pipe($.if(!isProduction, browserSync.stream()));
});

gulp.task('styles', ['clean:styles'], function () {
  return gulp.src(dirs.css + '/main.scss')
    .pipe($.plumber({
      handleError: function (err) {
        // console.log(err);
        this.emit('end');
      }
    }))
    // .pipe($.newer(dirs.css))
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.sass({
      precision: 10,
      includePaths: [
        dirs.sass,
        dirs.sass + '/vendor'
        // 'node_modules/bourbon-neat/app/assets/stylesheets',
        // 'node_modules/bourbon/app/assets/stylesheets',
        // 'node_modules/typeplate-starter-kit/dist/scss'
      ]
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'}),
      mqpacker,
      csswring
    ]))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    // .pipe($.if(isProduction, $.gzip({append: false})))
    .pipe(gulp.dest(dirs.css))
    .pipe(gulp.dest(dirs.dest + '/' + dirs.css))
    .pipe($.if(!isProduction, browserSync.stream()));
});

gulp.task('styles:vendor', ['clean:vendorstyles'], function () {
  return gulp.src([
    // 'bower_components/animate.css/animate.min.css',
    // 'bower_components/bootstrap/dist/css/bootstrap.min.css',
    // 'bower_components/font-awesome/css/font-awesome.min.css',
    // 'bower_components/font-mfizz/css/font-mfizz.css'
  ])
  .pipe($.plumber({
    handleError: function (err) {
      // console.log(err);
      this.emit('end');
    }
  }))
  .pipe($.if(!isProduction, $.sourcemaps.init()))
  .pipe($.concat('vendor.min.css'))
  .pipe($.postcss([
    autoprefixer({browsers: 'last 1 version'}),
    mqpacker,
    csswring
  ]))
  .pipe($.if(!isProduction, $.sourcemaps.write('.')))
  // .pipe($.if(isProduction, $.if('*.min.css', $.gzip({append: false}))))
  .pipe(gulp.dest(dirs.css))
  .pipe(gulp.dest(dirs.dest + '/' + dirs.css))
  .pipe($.if(!isProduction, browserSync.stream()));
});

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', [
  // 'styles:vendor',
  'lint:styles',
  'styles',
  'scripts:vendor',
  'lint:scripts',
  'scripts',
  // 'fonts',
  'images'
], function (done) {
  return done();
});

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', [ 'assets', 'jekyll' ], function (done) {
  return done();
});

var browserSyncConfig = {
  server: {
    baseDir: output
  },
  port: port,
  open: 'local',
  browser: [
    // 'safari',
    // 'firefox',
    'google chrome'
  ],
  host: url,
  injectChanges: true,
  notify: true,
  reloadDebounce: 2000,
  reloadDelay: 500,
  reloadOnRestart: true,
  reloadThrottle: 5000,
  scrollProportionally: true,
  scrollThrottle: 150,
  startPath: baseurl
};

gulp.task('serve', function () {
  browserSync(browserSyncConfig);

  // Jekyll
  gulp.watch([
    '_config.yml',
    '**/*.{md,markdown,html}',
    '_data/*.{json,yml}',
    '!' + dirs.dest + '/**',
    '!' + dirs.sass + '/**',
    '!' + dirs.img + '/**',
    '!' + dirs.imgc + '/**',
    '!' + dirs.css + '/**',
    '!node_modules/**'
  ], {
    interval: 500,
    name: 'jekyll',
    readDelay: 150
  }, function (event) {
    console.log('File ' + event.path + ' was ' + event.type);
    gulp.start([
      'jekyll:incremental'
    ]);
  });

  // Assets
  gulp.watch([dirs.js + '/main.js'], {interval: 500}, ['lint:scripts','scripts', browserSync.reload]);
  gulp.watch([dirs.js + '/vendor/**/*.js'], {interval: 500}, ['scripts:vendor', browserSync.reload]);
  gulp.watch([dirs.sass + '/**/*.s+(a|c)ss', dirs.css + '/main.scss'], {interval: 500}, ['lint:styles','styles', browserSync.reload]);
  gulp.watch([dirs.img + '/**/*'], {interval: 500}, ['images', browserSync.reload]);
});

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
gulp.task('default', ['build'], function () {
  gulp.start('serve');
});

