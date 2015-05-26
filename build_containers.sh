#!/bin/bash
docker build -t my-proxy lb/
docker build -t my-front frontend/
docker build -t my-back backend/

