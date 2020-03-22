 const fs = require('fs');
 const logger = console;
 const ITERATIONS_MAX = 3;
 let iteration = 0;
 logger.info('START', 'MAINLINE');
 const timeout = setInterval(() => {
     logger.info('START: setInterval', 'TIMERS PHASE');
     if (iteration < ITERATIONS_MAX) {
         setTimeout(() => {
             logger.info('TIMERS PHASE', 'setInterval.setTimeout');
         });
         fs.readdir('./data', (err, files) => {
             if (err) throw err;
             logger.info('fs.readdir() callback: Directory contains: '
             + files.length
             + ' files', 'POLL PHASE');
         });
         logger.info('sync infos.')
     } else {
         logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
         clearInterval(timeout);
     }
     iteration++;
     logger.info('END: setInterval', 'TIMERS PHASE');
 }, 0);
 logger.info('END', 'MAINLINE');
 

 /**
  * 
START MAINLINE
END MAINLINE
START: setInterval TIMERS PHASE
END: setInterval TIMERS PHASE
fs.readdir() callback: Directory contains: 1 files POLL PHASE
TIMERS PHASE setInterval.setTimeout
START: setInterval TIMERS PHASE
END: setInterval TIMERS PHASE
fs.readdir() callback: Directory contains: 1 files POLL PHASE
TIMERS PHASE setInterval.setTimeout
START: setInterval TIMERS PHASE
END: setInterval TIMERS PHASE
fs.readdir() callback: Directory contains: 1 files POLL PHASE
TIMERS PHASE setInterval.setTimeout
START: setInterval TIMERS PHASE
Max interval count exceeded. Goodbye. TIMERS PHASE
END: setInterval TIMERS PHASE
  */