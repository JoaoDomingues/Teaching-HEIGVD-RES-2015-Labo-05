From httpd:2.4
COPY ./files/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./files/reverse-proxy.conf /usr/local/apache2/conf/extra/reverse-proxy.conf
RUN apt-get update && apt-get -y install vim
