#!/bin/bash
pm2 start /randomiseur/randNum.js
pm2 start /randomiseur/hearthbeat.js
pm2 monit