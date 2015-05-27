From httpd:2.4

# installation de node.js et de pm2
RUN apt-get update
RUN apt-get install vim -y
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9

#copie des fichiers de configuration
COPY ./files/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./files/my-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

#copie les application, découverte dynamique
COPY application/ /app/
COPY original/ /app/original/

#lance le serveur et la découverte dynamique
CMD ["bash", "/app/start.sh"]