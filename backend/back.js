
// We use a standard Node.js module to work with UDP
var dgram = require('dgram');

// Let's create a datagram socket. We will use it to send our UDP datagrams 
var s = dgram.createSocket('udp4');

function Random() {

	var that = this;

	this.location = location;
	this.temperature = temperature;
	this.variation = variation;
			
	Random.prototype.update = function() {  
	  var val = Math.random();
     
	  var value = new Object();
     value.val = val;
	  var payload = JSON.stringify(value);
	
	  message = new Buffer(payload);	
	  s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {
	  	console.log("Sending payload: " + payload + " via port " + s.address().port);
	  });
	
	}
	setInterval(that.update, 200);
	
}

// Let's create a new thermoter - the regular publication of measures will
// be initiated within the constructor
var t1 = new Random();


