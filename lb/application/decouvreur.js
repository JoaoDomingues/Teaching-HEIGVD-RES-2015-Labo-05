// ce script, permet de faire la d�couverte dynamique,
// il r�cupere les datagram envoi� � une certaine adresse
// multicast, v�rifie si c'est des frontend ou backend, 
// les ajoutes � une tableau et tout les x temps, il regarde
// s'il y a un changement (apparition d'un frontend ou backend)
// et refait la configuration du load balancer puis relance le serveur 
// dans ce cas. (code de base repris du station.js vu en cours)

var protocol = require('./protocol');

var dgram = require('dgram');

var decouvre = dgram.createSocket('udp4');

var tableauFront = [];
var tableauBack = [];

var tableauNouveauFront = [];
var tableauNouveauBack = [];

decouvre.bind(protocol.PROTOCOL_PORT, function() {
  console.log("Joining multicast group");
  decouvre.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

// appeler quand un nouveau message apparait
decouvre.on('message', function(msg, source) {
   //v�rifie s'il l'adresse ip n'est pas d�j� dans la table des frontend
   if(tableauNouveauFront.indexOf(source.address) == -1){
      // v�rifie si c'est bien un frontend
      if(msg == "frontend"){
         tableauNouveauFront.push(source.address);
      }
   }
   //v�rifie s'il l'adresse ip n'est pas d�j� dans la table des backend
   if(tableauNouveauBack.indexOf(source.address) == -1){
      // v�rifie si c'est bien un backend
      if(msg == "backend"){
         tableauNouveauBack.push(source.address);
      }
   }
});

function miseAJourConf(){
   var that=this;
	miseAJourConf.prototype.maj=function(){
   
      var i=0;
      var changement = false;
      //v�rifie s'il y a un changement � faire (apparition/disparition adresse)
      if(tableauFront.length != tableauNouveauFront.length 
         || tableauBack.length != tableauNouveauBack.length){
         changement = true;
      }
      // v�rifie si c'est toujours les m�me adresse pour les frontends
      for(i=0; i < tableauFront.length && !changement; i++){
         if(tableauFront.indexOf(tableauNouveauFront[i]) == -1){
            changement = true;
         }
      } 
      // v�rifie si c'est toujours les m�me adresse pour les backend
      for(i=0; i < tableauBack.length && !changement; i++){
         if(tableauBack.indexOf(tableauNouveauBack[i]) == -1){
            changement = true;
         }
      }
      //refait la configuration s'il y a eu un changement
      if(changement){
         tableauBack = tableauNouveauBack; 
         tableauFront = tableauNouveauFront;
         
         var filesystem=require('fs');
         
         var debut=filesystem.readFileSync('/app/original/my-httpd-vhosts-debut.conf', 'utf-8');
         var milieux=filesystem.readFileSync('/app/original/my-httpd-vhosts-milieux.conf', 'utf-8');
         var fin=filesystem.readFileSync('/app/original/my-httpd-vhosts-fin.conf', 'utf-8');
         
         // met le d�but du fichier
         var configuration=debut+'\n';
         
         // met les backend trouv�
         for(i=0; i < tableauBack.length;i++){
            configuration += "BalancerMember http://" + tableauBack[i]+ ":80" + '\n';
         }
         
         // met le milieux du fichier
         configuration += milieux;
         
         // met les front end trouv�
         for(i=0;i < tableauFront.length;i++){
            configuration += "BalancerMember http://" + tableauFront[i]+":80 " + "route=" + (i+1) + '\n';
         }
         
         // met la fin du fichiers
         configuration += fin;
   
         //enregistre la nouvelle configuration
         filesystem.writeFileSync("/usr/local/apache2/conf/extra/httpd-vhosts.conf", configuration.toString());
         
         //on relance le serveur avec la nouvelle configuration
         var exec = require('child_process').exec, child;
         child = exec("/usr/local/apache2/bin/apachectl restart",
         function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
               console.log('exec error: ' + error);
            }
         });
      }
      // efface les tableaux en attend la prochaine mise � jour
      tableauNouveauFront=[];
      tableauNouveauBack=[];
	}
   //on refait la configuration � intervalle r�gulier
	setInterval(that.maj,2000);
}

var control = new miseAJourConf;