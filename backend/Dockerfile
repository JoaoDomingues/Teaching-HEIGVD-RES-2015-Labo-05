FROM node

RUN npm install express

RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9
RUN apt-get install nano -y

COPY files /randomiseur/

CMD node /randomiseur/randNum.js -DFOREGROUND

#CMD pm2 start /app/randNum.js
#CMD pm2 start /app/hearthbeat.js
#CMD pm2 monit