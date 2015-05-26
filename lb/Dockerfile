From httpd:2.4

RUN apt-get update
RUN apt-get --purge remove node  -y
RUN apt-get install nodejs -y
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN apt-get update --fix-missing
RUN apt-get install npm -y
RUN npm install -g pm2@0.12.9

COPY ./files/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./files/my-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY application/ /app/
COPY original/ /app/original/
