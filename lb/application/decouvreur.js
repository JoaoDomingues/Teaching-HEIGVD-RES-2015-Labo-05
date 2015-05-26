
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
   if(tableauFront.indexOf(source.address) == -1 && tableauBack.indexOf(source.address) == -1){
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
      var filesystem=new ActiveXObject("Scripting.FileSystemObject");
      
      filesystem.CreateTextFile("/usr/local/apache2/conf/extra/httpd-vhosts.conf",true);
      
      var debut=fileSystem.OpenTextFile('/app/original/my-httpd-vhosts-debut.conf', 1 ,true);
      var milieux=fileSystem.OpenTextFile('/app/original/my-httpd-vhosts-milieux.conf', 1 ,true);
      var fin=fileSystem.OpenTextFile('/app/original/my-httpd-vhosts-fin.conf', 1 ,true);
      
      var configuration=fileSystem.OpenTextFile('httpd-vhosts.conf', 8 ,true);
      
      // construit le début du fichier de configuration
      configuration.WriteLine(debut.ReadAll());
      
      // met les backend trouvé
      for(i=1;i<=tableauBack.length;i++){
         configuration.WriteLine("BalancerMember http://" + tableauBack[i-1]+":80");
      }
      
      configuration.WriteLine(milieux.ReadAll());
      
      // met les front end trouvé
      for(i=1;i<=tableauFront.length;i++){
         configuration.WriteLine("BalancerMember http://" + tableauBack[i-1]+":80");
      }
      
      // met la fin du fichiers
      configuration.WriteLine(fin.ReadAll());
      
      // il faut ici relancer le serveur proxy pour qu'il prenne en compte
      // le nouveau fichier
      var exec = require('child_process').exec, child;

      child = exec("/usr/local/apache2/bin/apachectl restart",
      function (error, stdout, stderr) {
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
         if (error !== null) {
            console.log('exec error: ' + error);
         }
      });
      child();
      
      
      // efface les tableaux en attend la prochaine mise à jour
      tabFrontEnd=[];
      tabBackEnd=[];
	}
   //on refait la configuration à intervalle régulier
	setInterval(that.update,2000);
}

var control = new misaAJourConf;