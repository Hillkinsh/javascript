const logger = console
module.exports = function registerReadableStreamEventListeners(readableStream) {
     readableStream.on('open', (fd) => {
         logger.info('open event received, file descriptor: ' + fd, 'ReadableStream.on(open).callback');
     });
     readableStream.on('data', (chunk) => {
         logger.info('data event received: chunk size: ' + chunk.length, 'ReadableStream.on(data).callback');
     });
     readableStream.on('error', (err) => {
         logger.info('Something has gone horribly wrong: ' + err.message, 'ReadableStream.on(error).callback');
     });
     readableStream.on('close', () => {
         logger.info('close event received', 'ReadableStream.on(close).callback');
     });
 }