#!/bin/bash
docker build -t my-lb lb/
docker build -t my-front frontend/
docker build -t my-back backend/

