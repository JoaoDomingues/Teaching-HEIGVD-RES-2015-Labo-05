
var protocol = require('./protocol');

var dgram = require('dgram');
var IPFront = [];
var IPBack = [];

var decouvre = dgram.createSocket('udp4');

decouvre.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  decouvre.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

// appeler quand un nouveau message apparait
decouvre.on('message', function(msg, source) {
   // vérifie s'il connait la source
   if(IPFront.indexOf(source.address) == -1 && IPBack.indexOf(source.address) == -1){
   // vérifie si c'est un front end ou back end
      if(msg == "frontend"){
         IPFront.push(source.address);
      }
      else{
         IPBack.push(source.address);
      }
      // ici, on doit refaire la configuration pour le load balancer
   }
	console.log("Data has arrived: " + msg + ". Source IP: " + source.address + ". Source port: " + source.port);
});
