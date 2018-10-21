#!/usr/bin/env bash

# In package.json folgenden Eintrag zu scripts hinzufügen, um npm run lib
# ausführen zu können:
#   "scripts": {
#      "serve": "vue-cli-service serve",
#      "build": "vue-cli-service build",
#      "lint": "vue-cli-service lint",
#      "lib": "vue-cli-service build --target lib --name begegnungserfassung src/main.js"
#    }

npm run lib && \
  sudo cp dist/begegnungserfassung.css* /Users/andreas/Project/edart-bayern.de/ligaverwaltung-bundle/src/Resources/public
  sudo cp dist/begegnungserfassung.umd.* /Users/andreas/Project/edart-bayern.de/ligaverwaltung-bundle/src/Resources/public