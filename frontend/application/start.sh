#!/bin/bash
/etc/init.d/apache2 start
pm2 start /app/hearthbeat.js
pm2 monit