var gulp = require('gulp') ;
var browserSync = require('browser-sync');
var inlinesource = require('gulp-inline-source');
var prompt = require('gulp-prompt');
var url = require('url-regexp');
var plugins = require('gulp-load-plugins')();

var cssFiles = [
  'node_modules/font-awesome/css/font-awesome.min.css'
] ;

var fontFiles = [
  'node_modules/bootstrap/dist/fonts/*',
  'node_modules/font-awesome/fonts/*'
] ;

var jsFiles = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/jquery/dist/jquery.min.map',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'node_modules/imagesloaded/imagesloaded.pkgd.js',
	'node_modules/isotope-layout/node_modules/masonry-layout/dist/masonry.pkgd.js',
	'node_modules/holderjs/holder.js'
] ;

var jsLibFiles = [
  'js/lib/jquery.js',
  'js/lib/bootstrap.js',
  'js/lib/ie10-viewport-bug-workaround.js',
  'js/lib/imagesloaded.pkgd.js',
	'js/lib/masonry.pkgd.js',
	'js/lib/holder.js',
  'js/lib/jquery.balancetext.js',
  'js/lib/jquery.slabtext.js'
] ;


var distFiles = [
  'css/**/*.min.css',
  'css/**/*.map',
  'js/**/*.min.js',
  'js/**/*.map',
  'fonts/*',
  'img/**/*',
  '*.html',
  'screenshot*.png',
  'sitemap.xml'
] ;


gulp.task('copy-css', function(){
  return gulp.src(cssFiles)
    .pipe(gulp.dest('css')) ;
}) ;

gulp.task('copy-js', function(){
  return gulp.src(jsFiles)
    .pipe(gulp.dest('js/lib')) ;
}) ;

gulp.task('copy-fonts', function(){
  return gulp.src(fontFiles)
    .pipe(gulp.dest('fonts')) ;
}) ;

gulp.task('js', function () {
  return gulp.src(['js/*.js', '!js/*.min.js','!js/phantom.js'])
     .pipe(plugins.uglify())
     .pipe(plugins.rename({ extname: '.min.js' }))
     .pipe(gulp.dest('js'));
});

gulp.task('bundle-js',['copy-js'], function(){
  return gulp.src(jsLibFiles)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('bundle.min.js'))
    .pipe(gulp.dest('js/lib'));
} ) ;


gulp.task('less', function() {
    return gulp.src(['less/*.less','!less/*.inc.less'])
        .pipe(plugins.less())
        .pipe(gulp.dest('css'))
        .pipe(plugins.autoprefixer({ cascade: false }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({ extname: '.min.css' }))
        .pipe(gulp.dest('css'));
});

gulp.task('sitemap', function () {

  return gulp.src('*.html')
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

				return gulp.src('*.html')
	  		.pipe(plugins.sitemap({
	          siteUrl: res.url
	      }))
	      .pipe(gulp.dest('.'));

	  }));


});

gulp.task('phantom', function(){
  return gulp.src('js/phantom.js')
    .pipe(plugins.phantom())
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['copy-css','copy-fonts','bundle-js','js','less','phantom']);

gulp.task('seo', ['sitemap'] , function () {

  gulp.src('img/**/*.@(jpg|jpeg|gif|png)')
    .pipe(plugins.image())
    .pipe(gulp.dest('img'));

  gulp.src(['*.html','!*.min.html'])
    .pipe(inlinesource())
    .pipe(plugins.rename({ extname: '.min.html' }))
		.pipe(gulp.dest('.'));

});


gulp.task('dist', ['build'], function(){
	return gulp.src(distFiles)
    .pipe(plugins.copy('dist')) ;
});

gulp.task('less-reload', ['less'], browserSync.reload );
gulp.task('js-reload', ['js'], browserSync.reload );

gulp.task('live', ['build'], function() {

    browserSync({
        server: './'
    });

    gulp.watch('less/*.less', ['less-reload']);
    gulp.watch(['js/*.js','!js/*.min.js'], ['js-reload']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('watch', ['build'], function() {
		gulp.watch('less/*.less', ['less']);
    gulp.watch(['js/*.js','!js/*.min.js'], ['js']);
});

gulp.task('default', ['build']);
