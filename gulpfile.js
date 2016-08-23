var gulp 			= require('gulp')
		uglify 		= require('gulp-uglify')
		minify 		= require('gulp-minify')
		concat 		= require('gulp-concat')
    notify 		= require('gulp-notify')
		mergeJson = require('gulp-merge-json');


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
      paths.npmDir + '/shuffle-array/dist/shuffle-array.min.js',
			paths.npmDir + '/jquery/dist/jquery.js',
			paths.npmDir + '/bootstrap/dist/js/bootstrap.js',
			paths.npmDir + '/chart.js/dist/Chart.bundle.min.js',
		])
		//.pipe(uglify())
		.pipe(concat('static.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('scriptsFrontEnd', function() {
    return gulp.src([

		])
		.pipe(concat('staticFrontEnd.js'))
        .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('scriptsBackEnd', function() {
    return gulp.src([

		])
		.pipe(concat('staticBackEnd.js'))
    .pipe(gulp.dest(paths.scriptDest));
});

/**
 * Stylesheet files
 */
gulp.task('cssGeneral', function() {
    return gulp.src([
		paths.npmDir + '/bootstrap/dist/css/bootstrap.css',
		paths.npmDir + '/font-awesome/css/font-awesome.css',
	])
	.pipe(concat('static.css'))
  .pipe(gulp.dest(paths.cssDest));
});

gulp.task('cssBackEnd', function() {
    return gulp.src([

	])
	  .pipe(concat('staticBackEnd.css'))
      .pipe(gulp.dest(paths.cssDest));
});

gulp.task('cssFrontEnd', function() {
    return gulp.src([

    ])
	  .pipe(concat('staticFrontEnd.css'))
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

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scriptsGeneral', 'scriptsFrontEnd','scriptsBackEnd','cssFrontEnd', 'cssGeneral','cssBackEnd','fonts', 'localesDe', 'localesEn','localesRu']);
