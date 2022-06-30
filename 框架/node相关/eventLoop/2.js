setImmediate(() => console.log('immediate1')); // check
setImmediate(() => console.log('immediate2')); // check

setTimeout(() => console.log('setTimeout1'), 1000);
setTimeout(() => {
    console.log('setTimeout2');
    process.nextTick(() => console.log('nextTick1'));
}, 0);
setTimeout(() => console.log('setTimeout3'), 0);

process.nextTick(() => console.log('nextTick2'));
process.nextTick(() => {
    process.nextTick(console.log.bind(console, 'nextTick3'));
});
process.nextTick(() => console.log('nextTick4'));

/**
 * nextTick2
 * nextTick3
 * nextTick4
 * 
 * setTimeout2
 * nextTick1
 * setTimeout3
 * 
 * immediate1
 * immediate2
 * 
 * setTimeout1
 * 
 */