#!/usr/bin/env bash

# Zielverzeichnis (Entwicklungsumgebung Contao Bundle)
TARGET_DIR=/Users/andreas/Project/edart-bayern.de/contao-ligaverwaltung-bundle/public

#CONTAO_DIR=/Users/andreas/Sites/edart-bayern.de
CONTAO_DIR=/Users/andreas/Sites/contao-5

for type in js css
do 
  if [ ! -d ${TARGET_DIR}/${type} ]
  then
    echo "erzeuge Verzeichnis ${TARGET_DIR}/${type}"
    mkdir ${TARGET_DIR}/${type}
  fi
done

npm run build && \
  cp dist/css/app.*.css ${TARGET_DIR}/css && \
  cp dist/js/app.*.js ${TARGET_DIR}/js  && \
  cp dist/js/chunk-vendors.*.js ${TARGET_DIR}/js

cd $CONTAO_DIR
./manage.sh
cd -
