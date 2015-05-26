#!/bin/bash
docker run -it -d --name my-running-front1 my-front
docker run -it -d --name my-running-front2 my-front
docker run -it -d --name my-running-back1 my-back
docker run -it -d --name my-running-back2 my-back

ipfront1=$(docker inspect my-running-front1 | grep -i ipa | cut -d ':' -f2 | cut -d '"' -f2)
ipfront2=$(docker inspect my-running-front2 | grep -i ipa | cut -d ':' -f2 | cut -d '"' -f2)
ipback1=$(docker inspect my-running-back1 | grep -i ipa | cut -d ':' -f2 | cut -d '"' -f2)
ipback2=$(docker inspect my-running-back2 | grep -i ipa | cut -d ':' -f2 | cut -d '"' -f2)

echo "IP adresse front1: $ipfront1"
echo "IP adresse front2: $ipfront2"
echo "IP adresse back1 : $ipback1"
echo "IP adresse back2 : $ipback2"

rm -f lb/files/my-httpd-vhosts.conf

cat original/my-httpd-vhosts-debut.conf >> lb/files/my-httpd-vhosts.conf

echo "      BalancerMember http://$ipback1:80 " >> lb/files/my-httpd-vhosts.conf
echo "      BalancerMember http://$ipback2:80 " >> lb/files/my-httpd-vhosts.conf

cat original/my-httpd-vhosts-milieux.conf >> lb/files/my-httpd-vhosts.conf

echo "      BalancerMember http://$ipfront1:80 route=1" >> lb/files/my-httpd-vhosts.conf
echo "      BalancerMember http://$ipfront2:80 route=2" >> lb/files/my-httpd-vhosts.conf

cat original/my-httpd-vhosts-fin.conf >> lb/files/my-httpd-vhosts.conf

docker build -t my-proxy lb/
docker run -it --rm --name my-running-proxy -p 80:80 my-proxy
