'use strict'

import gulp from 'gulp'
import stylus from 'gulp-stylus'
import babel from 'gulp-babel'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import del from 'del'
import prefix from 'autoprefixer-stylus'
import sourceMaps from 'gulp-sourcemaps'

const paths = {
  css: {
    src: 'src/css/**/*.styl',
    dest: 'build/css/'
  },
  html: {
    src: 'src/views/**/*.pug',
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
    open: false
  }, cb)
}

// You can still declare named functions and export them as tasks
export function css () {
  return gulp.src(paths.css.src)
    .pipe(sourceMaps.init())
    .pipe(stylus({
      use: prefix({ browsers: ['last 3 versions'] })
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.reload({stream: true}))
}

export function html () {
  return gulp.src('src/views/**/*.pug')
    .pipe(pug())
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
