#!/usr/bin/env bash

# In package.json folgenden Eintrag zu scripts hinzufügen, um npm run lib
# ausführen zu können:
#   "scripts": {
#      "serve": "vue-cli-service serve",
#      "build": "vue-cli-service build",
#      "lint": "vue-cli-service lint",
#      "lib": "vue-cli-service build --target lib --name begegnungserfassung src/main.js"
#    }

# Zielverzeichnis für die Produktion (Eingabe im BE)
#TARGET_DIR=/Users/andreas/Project/edart-bayern.de/ligaverwaltung-bundle/src/Resources/public

# Zielverzeichnis für die Tests == Eingabe im FE
TARGET_DIR=/Users/andreas/Sites/edart-bayern.de-c4/files/assets/test  

npm run lib && \
  sudo cp dist/begegnungserfassung.css* ${TARGET_DIR}
  sudo cp dist/begegnungserfassung.umd.* ${TARGET_DIR}

cd /Users/andreas/Sites/edart-bayern.de-c4/
./manage.sh
./vendor/bin/contao-console contao:filesync
cd -  