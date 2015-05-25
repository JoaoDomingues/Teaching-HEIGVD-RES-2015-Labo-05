#From httpd:2.4
#
#RUN apt-get update
#
#COPY ./public-html/ /usr/local/apache2/htdocs/
#COPY ./my-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

FROM node

RUN npm install express

COPY files /randomiseur/

CMD node /randomiseur/randNum.js -DFOREGROUND