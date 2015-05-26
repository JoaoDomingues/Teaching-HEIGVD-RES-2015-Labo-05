
var protocol = require('./protocol');

var dgram = require('dgram');

var s = dgram.createSocket('udp4');

function HearthBeat(){

	var that = this;
	HearthBeat.prototype.update = function() {
		var payload = "backend";
		message = new Buffer(payload);
		s.send(message, 0, message.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS, function(err, bytes){});
	}
    setInterval(that.update, 200);
}

var beat = new HearthBeat();