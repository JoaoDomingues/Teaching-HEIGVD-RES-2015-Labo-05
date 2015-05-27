FROM node

RUN npm install express

# installation de pm2
RUN apt-get update 
RUN npm install -g pm2@0.12.9

#copie des fichiers d'aplication, hearthbeat et randNum
COPY files /randomiseur/

#lance le serveur et sont heartbeat
CMD ["bash", "/randomiseur/start.sh"]