 const logger = console
 const ITERATIONS_MAX = 5;
 let iteration = 0;
 logger.info('START', 'MAINLINE');
 const timeout = setInterval(() => {
     logger.info('START: setInterval', 'TIMERS PHASE');
     if (iteration < ITERATIONS_MAX) {
         setTimeout(() => {
             logger.info('setInterval.setTimeout', 'TIMERS PHASE');
         });
     } else {
         logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
         clearInterval(timeout);
     }
     iteration++;
     logger.info('END: setInterval', 'TIMERS PHASE');
 }, 0);
 logger.info('MAINLINE: END');