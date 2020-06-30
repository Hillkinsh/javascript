var gulp = require('gulp');
var uglify = require('gulp-uglify')
// gulp.task('a', () => {
//   return gulp.src('a.js')
//   .pipe('dist')
// })
// gulp.task('b', () => {
//   return gulp.src('b.js')
//   .pipe('dist')
// })
// gulp.task('c', () => {
//   return gulp.src('c.js')
//   .pipe('dist')
// })

// // 并行与串行

// // 串
// gulp.task('default', ['watch', 'connect'])

// // 并
// var gulpSequence = require('gulp-sequence')
// gulp.task('sequenceTask', function(cb){
// 	gulpSequence('bulidRev','replaceRev')(cb)
// })

// gulp.task('minify', () => {
//   gulp.src('./a.js')
//   .pipe(uglify())
//   .pipe(gulp.dest('build'))
// })

function minify (cb) {
  return gulp.src('*.js')
  // .pipe(uglify())
  .pipe(gulp.dest('build'));
}

exports.minify = minify;


