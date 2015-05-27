
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
   //vérifie s'il l'adresse ip n'est pas déjà dans la table des frontend
   if(tableauNouveauFront.indexOf(source.address) == -1){
      // vérifie si c'est bien un frontend
      if(msg == "frontend"){
         tableauNouveauFront.push(source.address);
      }
   }
   //vérifie s'il l'adresse ip n'est pas déjà dans la table des backend
   if(tableauNouveauBack.indexOf(source.address) == -1){
      // vérifie si c'est bien un backend
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
      //vérifie s'il y a un changement à faire (apparition/disparition adresse)
      if(tableauFront.length != tableauNouveauFront.length 
         || tableauBack.length != tableauNouveauBack.length){
         changement = true;
      }
      // vérifie si c'est toujours les même adresse pour les frontends
      for(i=0; i < tableauFront.length && !changement; i++){
         if(tableauFront.indexOf(tableauNouveauFront[i]) == -1){
            changement = true;
         }
      }
      
      // vérifie si c'est toujours les même adresse pour les backend
      for(i=0; i < tableauBack.length && !changement; i++){
         if(tableauBack.indexOf(tableauNouveauBack[i]) == -1){
            changement = true;
         }
      }
      if(changement){
         tableauBack = tableauNouveauBack; 
         tableauFront = tableauNouveauFront;
         
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
      // efface les tableaux en attend la prochaine mise à jour
      tableauNouveauFront=[];
      tableauNouveauBack=[];
	}
   //on refait la configuration à intervalle régulier
	setInterval(that.maj,2000);
}

var control = new miseAJourConf;