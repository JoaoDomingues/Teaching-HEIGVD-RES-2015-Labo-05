FROM node

RUN npm install express

RUN apt-get update 
RUN npm install -g pm2@0.12.9

COPY files /randomiseur/

RUN chmod 777 /randomiseur/start.sh
ENTRYPOINT /randomiseur/start.sh