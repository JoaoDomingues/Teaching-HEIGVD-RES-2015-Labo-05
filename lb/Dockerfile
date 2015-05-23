From httpd:2.4
RUN apt-get update && apt-get -y install vim

COPY ./public-html/ /usr/local/apache2/htdocs/

COPY ./files/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./files/my-httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf