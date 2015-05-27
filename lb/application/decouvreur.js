
var protocol = require('./protocol');

var dgram = require('dgram');
var tableauFront = [];
var tableauBack = [];

var decouvre = dgram.createSocket('udp4');

decouvre.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  decouvre.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

// appeler quand un nouveau message apparait
decouvre.on('message', function(msg, source) {
   // vérifie s'il connait la source
   if(tableauFront.indexOf(source.address) == -1 || tableauBack.indexOf(source.address) == -1){
   // vérifie si c'est un front end ou back end
      if(msg == "frontend"){
         tableauFront.push(source.address);
      }
      else if(msg == "backend") {
          tableauBack.push(source.address);
      }
   }
	console.log("Data has arrived: " + msg + ". Source IP: " + source.address + ". Source port: " + source.port);
});

function misaAJourConf(){
   var that=this;
	misaAJourConf.prototype.maj=function(){
      var i=0;
      var filesystem=require('fs');
      
      var debut=filesystem.readFileSync('/app/original/my-httpd-vhosts-debut.conf', 'utf-8');
      var milieux=filesystem.readFileSync('/app/original/my-httpd-vhosts-milieux.conf', 'utf-8');
      var fin=filesystem.readFileSync('/app/original/my-httpd-vhosts-fin.conf', 'utf-8');
      
      var configuration=debut+'\n';
      
      // met les backend trouvé
      for(i=0; i < tableauBack.length;i++){
         configuration += "BalancerMember http://" + tableauBack[i]+ ":80" + '\n';
      }
      
      configuration += milieux;
      
      // met les front end trouvé
      for(i=0;i < tableauFront.length;i++){
         configuration += "BalancerMember http://" + tableauFront[i]+":80" + '\n';
      }
      
      // met la fin du fichiers
      configuration += fin;
      
      // il faut ici relancer le serveur proxy pour qu'il prenne en compte
      // le nouveau fichier
      var exec = require('child_process').exec, child;

      fs.writeFileSync("/usr/local/apache2/conf/extra/httpd-vhosts.conf", configuration.toString());
      child = exec('chgrp www-data /usr/local/apache2/conf/extra/httpd-vhosts.conf')
      child = exec("/usr/local/apache2/bin/apachectl restart",
      function (error, stdout, stderr) {
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
         if (error !== null) {
            console.log('exec error: ' + error);
         }
      });
      
      // efface les tableaux en attend la prochaine mise à jour
      tabFrontEnd=[];
      tabBackEnd=[];
      console.log("quelque chose");
	}
   //on refait la configuration à intervalle régulier
	setInterval(that.update,2000);
}

var control = new misaAJourConf;