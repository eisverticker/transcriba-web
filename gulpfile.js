const { series, parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const mergeJson = require('gulp-merge-json');
const cleanDest = require('gulp-clean-dest');


const paths = {
  bowerDir: './bower_components',
  npmDir: './node_modules',
  scriptDest: './web/js/',
  cssDest: './web/css/',
  fontDest: './web/fonts/',
  resourcesDir: './app/Resources/',
  localeDest: 'web/locales/'
};

// put together locale strings
function localesDe() {
  return src('locales/**/de.json')
    .pipe(mergeJson({
      fileName: 'de.json'
    }))
    .pipe(dest(paths.localeDest));
}

function localesEn() {
  return src('locales/**/en.json')
  .pipe(mergeJson({
    fileName: 'en.json'
  }))
    .pipe(dest(paths.localeDest));
}

function localesRu() {
  return src('locales/**/ru.json')
    .pipe(mergeJson({
      fileName: 'ru.json'
    }))
    .pipe(dest(paths.localeDest));
}

// copy web-assets for ahead of time compilation
function copy() {
  return src(['web/**/*', 'web/**/*'], {})
    .pipe(cleanDest('dist/web'))
    .pipe(dest('dist/web'));
}


// the default task (called when you run `gulp` from cli)
exports.default = series(
  parallel(
    cssGeneral,
    fonts,
    localesDe,
    localesEn,
    localesRu,
  ),
  copy
);