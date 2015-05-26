FROM php:5.6-apache

RUN apt-get update
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9


COPY public-html/ /var/www/html/
COPY application/ /app/

RUN chmod 777 /app/start.sh
ENTRYPOINT /app/start.sh
