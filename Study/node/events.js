const events = require('events');

var eventEmitter = new events.EventEmitter();

var connected = function () {
   console.log('connection succesful.');
  
   eventEmitter.emit('data_received');
}

eventEmitter.on('connection', connected);
 
eventEmitter.on('data_received', function(){
   console.log('data received succesfully.');
});

eventEmitter.emit('connection');

console.log("Program Ended.");



