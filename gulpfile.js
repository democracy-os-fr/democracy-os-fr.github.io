/*global -$ */
'use strict';
// generated on 2015-05-03 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var url = require('url-regexp');
var prompt = require('gulp-prompt');
//var inlinesource = require('gulp-inline-source');
var ghPages = require('gulp-gh-pages');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('app/styles/main.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({ paths: ['.'] }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 versions']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('views', function () {
  return gulp.src('app/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['views','styles'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src(['app/*.html', '.tmp/*.html'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sitemap', function () {

  return gulp.src('app/*.html')
  	.pipe(prompt.prompt({
	    type: 'input',
	    name: 'url',
	    message: 'Enter site URL for sitemap.xml :',
	    default: 'http://www.democracyos.eu',
	    validate: function(siteUrl){


		      if (!siteUrl || !/[^\s]+/.test(siteUrl)) {
						siteUrl = 'http://www.democracyos.eu' ;
					}

	        if(!url.validate(siteUrl)){
	          return 'This is not a valid URL : ' + siteUrl ;
	        }

	        return true;
	    }
	  }, function(res){
	      //value is in res.url

				console.log('actual sitemap : ' + res.url) ;

				return gulp.src('app/*.html')
	  		.pipe($.sitemap({
	          siteUrl: res.url
	      }))
	      .pipe(gulp.dest('.'));

	  }));


});

gulp.task('phantom', function(){
  return gulp.src('phantom.js')
    .pipe($.phantom())
    .pipe(gulp.dest('images/screenshot'));
});

gulp.task('extras' ,function () {
  return gulp.src([
    'app/*.*',
    '!app/*.jade*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['views', 'styles', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['app/**/*.jade','app/includes/**/*.md'], ['views']);
  gulp.watch('app/styles/**/*.less', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.less')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/layouts/*.jade')
    .pipe(wiredep({
      exclude: ['/bootstrap/dist'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Github pages deployment

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      branch : 'deploy-test',
      message: 'gulp deploy 0.2.0'
    }));
});
