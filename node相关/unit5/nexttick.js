 const fs = require('fs');
 const logger = console;
 const ITERATIONS_MAX = 2;
 let iteration = 0;
 process.nextTick(() => {
     logger.info('process.nextTick', 'MAINLINE MICROTASK');
 });
 logger.info('START', 'MAINLINE');
 const timeout = setInterval(() => {
     logger.info('START iteration ' + iteration + ': setInterval', 'TIMERS PHASE');

     if (iteration < ITERATIONS_MAX) {
         setTimeout((iteration) => {
             logger.info('TIMER EXPIRED (from iteration ' + iteration + '): setInterval.setTimeout', 'TIMERS PHASE');
             process.nextTick(() => {
                 logger.info('setInterval.setTimeout.process.nextTick', 'TIMERS PHASE MICROTASK');
             });
         }, 0, iteration);
         fs.readdir('./data', (err, files) => {
             logger.info('fs.readdir() callback: Directory contains: ' + files.length + ' files', 'POLL PHASE');
             process.nextTick(() => {
                 logger.info('setInterval.fs.readdir.process.nextTick', 'POLL PHASE MICROTASK');
             });
         });
         setImmediate(() => {
             logger.info('setInterval.setImmediate', 'CHECK PHASE');
             process.nextTick(() => {
                 logger.info('setInterval.setTimeout.process.nextTick', 'CHECK PHASE MICROTASK');
             });
         });
     } else {
         logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
         clearInterval(timeout);
     }
     logger.info('END iteration ' + iteration + ': setInterval', 'TIMERS PHASE');
     iteration++;
 }, 0);
 logger.info('MAINLINE: END');


// START MAINLINE
// MAINLINE: END
// process.nextTick MAINLINE MICROTASK
// START iteration 0: setInterval TIMERS PHASE
// END iteration 0: setInterval TIMERS PHASE
// fs.readdir() callback: Directory contains: 1 files POLL PHASE
// setInterval.fs.readdir.process.nextTick POLL PHASE MICROTASK

// setInterval.setImmediate CHECK PHASE
// setInterval.setTimeout.process.nextTick CHECK PHASE MICROTASK

// TIMER EXPIRED (from iteration 0): setInterval.setTimeout TIMERS PHASE
// setInterval.setTimeout.process.nextTick TIMERS PHASE MICROTASK

// START iteration 1: setInterval TIMERS PHASE
// END iteration 1: setInterval TIMERS PHASE
// setInterval.setImmediate CHECK PHASE
// setInterval.setTimeout.process.nextTick CHECK PHASE MICROTASK
// fs.readdir() callback: Directory contains: 1 files POLL PHASE
// setInterval.fs.readdir.process.nextTick POLL PHASE MICROTASK
// TIMER EXPIRED (from iteration 1): setInterval.setTimeout TIMERS PHASE
// setInterval.setTimeout.process.nextTick TIMERS PHASE MICROTASK
// START iteration 2: setInterval TIMERS PHASE
// Max interval count exceeded. Goodbye. TIMERS PHASE
// END iteration 2: setInterval TIMERS PHASE