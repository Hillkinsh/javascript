// 尝试总结过一次，似懂非懂。果然很快忘光了。今天再理解记忆下

/**
 * 6个阶段
 * 1. timer 这个阶段执行setTimeout和setInterval预定的callback;
 * 2. i/ocallback:  
 *   执行除了 close事件的callbacks、
 *   被timers设定的callbacks、
 *   setImmediate()设定的callbacks这些之外的callbacks;
 * 3. idle prepare
 * 4. poll
 * 5.check
 * 6.close callback
 * 
 */

const fs = require('fs')
 setTimeout(_ => {console.log('setTimeout')}, 0)
 fs.readFile('./2.js', (err, data) => {
   if (err) throw err
   console.log(data)
 })
 setImmediate(_ => console.log('setImmediate'))
