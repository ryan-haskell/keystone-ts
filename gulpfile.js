const gulp = require('gulp')
const del = require('del')
const ts = require('gulp-typescript')
const sass = require('gulp-sass')
const series = require('run-sequence')
const browserify = require('browserify')
const tsify = require('tsify')
const source = require('vinyl-source-stream')


const paths = {
  del: {
    folders: [ '_dist' ]
  },
  pug: {
    src: 'src/**/*.pug',
    dest: '_dist'
  },
  css: {
    src: 'src/styles/**/*.scss',
    dest: '_dist/public'
  },
  typescript: {
    src: ['src/**/*.ts', '!src/scripts/**/*.ts'],
    dest: '_dist',
    project: ts.createProject('tsconfig.json')
  }
}

// Typescript
gulp.task('typescript', () => gulp
  .src(paths.typescript.src)
  .pipe(paths.typescript.project())
  .js
  .pipe(gulp.dest(paths.typescript.dest))
)

gulp.task('typescript:watch', ['typescript'], () =>
  gulp.watch(paths.typescript.src, ['typescript'])
)

// Frontend Typescript
gulp.task('frontend', () =>
  browserify({
    basedir: '',
    debug: true,
    entries: ['./src/scripts/main.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .on('error', () => {})
  .pipe(source('main.js'))
  .pipe(gulp.dest('_dist/public'))
)

gulp.task('frontend:watch', ['frontend'], () =>
  gulp.watch('src/scripts/**/*.ts', ['frontend'])
)

// Pug
gulp.task('pug', () =>
  gulp.src(paths.pug.src)
    .pipe(gulp.dest(paths.pug.dest))
)

gulp.task('pug:watch', ['pug'], () =>
  gulp.watch(paths.pug.src, ['pug'])
)

// CSS
gulp.task('css', () =>
  gulp.src(paths.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css.dest))
)

gulp.task('css:watch', ['css'], () =>
  gulp.watch(paths.css.src, ['css'])
)

gulp.task('clean', () => del(paths.del.folders))
gulp.task('build', ['pug', 'css', 'typescript', 'frontend'])
gulp.task('watch', ['pug:watch', 'css:watch', 'typescript:watch', 'frontend:watch'])

gulp.task('dev', (done) => series('clean', 'watch', done))
gulp.task('default', (done) => series('clean', 'build', done))
