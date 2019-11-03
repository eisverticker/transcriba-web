const { parallel, src, dest } = require('gulp');
const mergeJson = require('gulp-merge-json');


const paths = {
  bowerDir: './bower_components',
  localeDest: 'src/assets/locales/'
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


// the default task (called when you run `gulp` from cli)
exports.default = parallel(
  localesDe,
  localesEn,
  localesRu,
);