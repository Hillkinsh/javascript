const server = require('./start');
const route = require('./router');
var handle = require('./requestHandlers');

server.start(route.route, handle);