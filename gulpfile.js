var gulp 			= require('gulp')
		uglify 		= require('gulp-uglify')
		minify 		= require('gulp-minify')
		concat 		= require('gulp-concat')
    notify 		= require('gulp-notify')
		mergeJson = require('gulp-merge-json')
		cleanDest = require('gulp-clean-dest');


var paths = {
	 bowerDir: './bower_components',
	 npmDir: './node_modules',
	 scriptDest: './web/js/',
	 cssDest: './web/css/',
	 fontDest: './web/fonts/',
	 resourcesDir: './app/Resources/',
	 localeDest: 'web/locales/'
};

/**
 * Javascript-Files
 */
gulp.task('scriptsGeneral', function() {
    return gulp.src([
			paths.npmDir + '/jquery/dist/jquery.js',
			paths.npmDir + '/bootstrap/dist/js/bootstrap.js',
			paths.npmDir + '/core-js/client/shim.min.js',
			paths.npmDir + '/zone.js/dist/zone.js'
		])
		//.pipe(uglify())
		.pipe(concat('static.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('scriptsJustInTime', function() {
    return gulp.src([
			paths.npmDir + '/reflect-metadata/Reflect.js',
			paths.npmDir + '/systemjs/dist/system.src.js'
		])
		.pipe(concat('static-jit.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('scriptsAdditional', function() {
    return gulp.src([
			paths.npmDir + '/ng2-toastr/bundles/ng2-toastr.min.js'
		])
		.pipe(concat('static-additional.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

/**
 * Stylesheet files
 */
gulp.task('cssGeneral', function() {
    return gulp.src([
		paths.npmDir + '/bootstrap/dist/css/bootstrap.css',
		paths.npmDir + '/font-awesome/css/font-awesome.css',
		paths.npmDir + '/leaflet/dist/leaflet.css',
		paths.npmDir + '/ng2-toastr/bundles/ng2-toastr.min.css',
		paths.npmDir + '/ng2-toasty/style-bootstrap.css',
		'forms.css',
		'style.css'
	])
	.pipe(concat('static.css'))
  .pipe(gulp.dest(paths.cssDest));
});


gulp.task('fonts', function() {
    return gulp.src([
		paths.npmDir + '/bootstrap/dist/fonts/*.*',
		paths.npmDir + '/font-awesome/fonts/*.*',
	])
    .pipe(gulp.dest(paths.fontDest));
});

gulp.task('localesDe', function() {
	return gulp.src('locales/**/de.json')
	.pipe(mergeJson('de.json'))
	.pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesEn', function() {
	return gulp.src('locales/**/en.json')
	.pipe(mergeJson('en.json'))
	.pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesRu', function() {
	return gulp.src('locales/**/ru.json')
	.pipe(mergeJson('ru.json'))
	.pipe(gulp.dest(paths.localeDest));
});

gulp.task('copy', [], function () {
		 return gulp.src(['web/**/*', 'web/**/*'], {})
		 .pipe(cleanDest('aot/web'))
		 .pipe(gulp.dest('aot/web'));
 });

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scriptsGeneral', 'scriptsJustInTime', 'scriptsAdditional', 'cssGeneral','fonts', 'localesDe', 'localesEn','localesRu']);
