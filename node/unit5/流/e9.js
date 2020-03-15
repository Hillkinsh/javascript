const fs = require('fs')
const registerReadableStreamEventListeners = require('./read')
const registerWritableStreamEventListeners = require('./write')
// const appSettings = require('./appSettings')
let appSettings = {
  inputFileName: './readStream',
  outputFileName: './writeStream'
};
 (function mainline() {
       // Create the ReadableStream
       const readableStream = fs.createReadStream(appSettings.inputFileName, 'utf8');
       // Register event listeners for the input file
       registerReadableStreamEventListeners(readableStream);
       // The output file (WritableStream)
       const writableStream = fs.createWriteStream(appSettings.outputFileName, 'utf8');
       // Register event listeners for the output file
       registerWritableStreamEventListeners(writableStream, readableStream);
   })();