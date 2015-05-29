#!/bin/bash
declare -i nbFront=$1
for i in $(seq 1 1 $1)
do
   echo $i
done

for i in $(seq 1 1 $2)
do
   echo $i
done
