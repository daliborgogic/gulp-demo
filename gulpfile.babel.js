'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import del from 'del'
import prefix from 'gulp-autoprefixer'
import sourceMaps from 'gulp-sourcemaps'

const paths = {
  css: {
    src: 'src/css/**/*.scss',
    dest: 'build/css/'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'build/'
  }
}

// For small tasks you can use arrow functions and export
const clean = () => del([ 'build' ])
export { clean }

export function ws (cb) {
  return browserSync({
    server: {
      baseDir: 'build'
    },
    port: 3000,
    notify: false,
    open: true
  }, cb)
}

// You can still declare named functions and export them as tasks
export function css () {
  return gulp.src(paths.css.src)
    .pipe(sourceMaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
      },{
        use: prefix({
        browsers: ['last 3 versions']
      })
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.reload({stream: true}))
}

export function html () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
}

export function watch () {
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.css.src, css)
}

const build = gulp.series(clean, gulp.parallel(css, html, ws), watch)
export { build }

// Export a default task
export default build
