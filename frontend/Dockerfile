FROM php:5.6-apache

# installation de node.js et de pm2
RUN apt-get update
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9

#copie du fichier php
COPY public-html/ /var/www/html/

#copie les application, heartbeat
COPY application/ /app/

#lance le serveur et sont heartbeat
CMD ["bash", "/app/start.sh"]
