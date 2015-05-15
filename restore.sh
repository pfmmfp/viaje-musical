#!/bin/bash
for i in "$@"
do
case $i in
    -r=*|--region=*)
    REGION="${i#*=}"

    ;;
    -e=*|--enviroment=*)
    ENVIROMENT="${i#*=}"
    ;;
    -h=*|--help=*)
    HELP="${i#*=}"
    ;;
    *)
      # unknown option
    ;;
esac
done	

cp -r ./data/${REGION}/common/ ./public/
mongorestore --db viaje-musical ./data/${REGION}/mongodump/
