#!/usr/bin/env bash

# Zielverzeichnis (Entwicklungsumgebung Contao Bundle)
TARGET_DIR=/Users/andreas/Sites/edart-bayern.de/local-dev-bundles/ligaverwaltung-bundle/src/Resources/public

for type in js css
do 
  if [ ! -d ${TARGET_DIR}/${type} ]
  then
    echo "erzeuge Verzeichnis ${TARGET_DIR}/${type}"
    mkdir ${TARGET_DIR}/${type}
  fi
done

npm run build && \
  sudo cp dist/css/app.css ${TARGET_DIR}/css && \
  sudo cp dist/js/app.js ${TARGET_DIR}/js  && \
  sudo cp dist/js/chunk-vendors.js ${TARGET_DIR}/js

cd /Users/andreas/Sites/edart-bayern.de/
./manage.sh
cd -
