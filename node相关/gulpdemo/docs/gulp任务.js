// 版本3和4 的任务书写方式不同，并且版本4不支持版本3的写法，这有点坑爹

import gulpfile from "../gulpfile";

// 版本3
gulpfile.task('hello', () => {
  return gulp.src('*.js')
  .pipe(dest('out'))
})

// 版本4

function helloTask () {
  return gulp.src('*.js')
  .pipe(dest('out'))
}