const logger = console
module.exports = function registerWritableStreamEventListeners(writableStream, readableStream) {
     writableStream.on('open', (fd) => {
         logger.info('open event received, file descriptor: ' + fd, 'WritableStream.on(open).callback');
         // Connect the readableStream to the writableStream
         readableStream.pipe(writableStream);
     });
     writableStream.on('pipe', (src) => {
         logger.info('pipe event received, let the data flow!', 'WritableStream.on(pipe).callback');
     });
     writableStream.on('error', (err) => {
         logger.info('Something has gone horribly wrong: ' + err.message, 'WritableStream.on(error).callback');
     });
     writableStream.on('close', () => {
         logger.info('close event received', 'WritableStream.on(close).callback');
     });
 }