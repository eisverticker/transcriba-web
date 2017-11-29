var gulp = require('gulp');
var concat = require('gulp-concat');
var mergeJson = require('gulp-merge-json');


var paths = {
  npmDir: './node_modules',
  resourcesDir: './app/Resources/',
  localeDest: 'src/assets/locales/'
};


// put together locale strings
gulp.task('localesDe', function() {
  return gulp.src('locales/**/de.json')
    .pipe(mergeJson({
      fileName: 'de.json' 
    }))
    .pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesEn', function() {
  return gulp.src('locales/**/en.json')
    .pipe(mergeJson({
      fileName: 'en.json'
    }))
    .pipe(gulp.dest(paths.localeDest));
});

gulp.task('localesRu', function() {
  return gulp.src('locales/**/ru.json')
    .pipe(mergeJson({
      fileName: 'ru.json'
    }))
    .pipe(gulp.dest(paths.localeDest));
});

// copy web-assets for ahead of time compilation
gulp.task('copy', [], function() {
  return gulp.src(['web/**/*', 'web/**/*'], {})
    .pipe(cleanDest('dist/web'))
    .pipe(gulp.dest('dist/web'));
});

// the default task (called when you run `gulp` from cli)
gulp.task('default', ['localesDe', 'localesEn', 'localesRu']);
