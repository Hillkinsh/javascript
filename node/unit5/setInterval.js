const logger = console
 const ITERATIONS_MAX = 5;
 let iteration = 0;
 logger.info('START', 'MAINLINE');
 const timeout = setInterval(() => {
     logger.info('START: setInterval', 'TIMERS PHASE');
     if (iteration >= ITERATIONS_MAX) {
         logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
         // Kill the interval timer
        clearInterval(timeout);
     }
     iteration++;
     logger.info('END: setInterval', 'TIMERS PHASE');
 }, 10);
 logger.info('END', 'MAINLINE');