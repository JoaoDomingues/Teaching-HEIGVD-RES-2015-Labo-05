#!/bin/bash
/usr/local/apache2/bin/apachectl start
pm2 start /app/decouvreur.js
pm2 monit