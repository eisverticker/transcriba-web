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

async function scriptsGeneral() {
  return src([
      paths.npmDir + '/jquery/dist/jquery.js',
      paths.npmDir + '/bootstrap/dist/js/bootstrap.js',
      paths.npmDir + '/core-js/client/shim.min.js',
      paths.npmDir + '/zone.js/dist/zone.js'
    ])
    .pipe(concat('static.js'))
    .pipe(dest(paths.scriptDest));
}

async function scriptsJustInTime() {
  return src([
      paths.npmDir + '/systemjs/dist/system.src.js'
    ])
    .pipe(concat('static-jit.js'))
    .pipe(dest(paths.scriptDest));
}

function cssGeneral() {
  return src([
      paths.npmDir + '/bootstrap/dist/css/bootstrap.css',
      paths.npmDir + '/font-awesome/css/font-awesome.css',
      paths.npmDir + '/leaflet/dist/leaflet.css',
      paths.npmDir + '/ng2-toasty/style-bootstrap.css',
      'forms.css',
      'style.css'
    ])
    .pipe(concat('static.css'))
    .pipe(dest(paths.cssDest));
}

function fonts() {
  return src([
      paths.npmDir + '/bootstrap/dist/fonts/*.*',
      paths.npmDir + '/font-awesome/fonts/*.*',
    ])
    .pipe(dest(paths.fontDest));
}

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
    scriptsGeneral,
    scriptsJustInTime,
    cssGeneral,
    fonts,
    localesDe,
    localesEn,
    localesRu,
  ),
  copy
);