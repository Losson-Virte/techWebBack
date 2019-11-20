## Prérequis :

- Avoir MongoDB
    - Vous pouvez trouver et lancer une image de MongoDB via Docker via la commande suivante : `docker run -d -p 27017-27019:27017-27019 --name mongo mongo:latest`
- Avoir Robo 3T
    - Nous allons utiliser Robo 3T pour communiquer avec MongoDB, vous pouvez l'installer à partir du lien suivant : https://robomongo.org/download
- Avoir Git
    - Git va nous permettre de récupérer les différentes parties du projet
    
## Installation :
- Récupérer la partie back-end avec la commande : `git clone https://github.com/Losson-Virte/techWebBack.git`
- Récupérer la partir front-end avec la commande : `git clone https://github.com/Losson-Virte/techWebFront.git`
- Dans les dossiers "techWebBack" et "techWwebFront", lancer la commande `yarn install` pour installer les dépendances
- Dans Robo 3T
    - Créer une connexion à MongoDB (File -> Connect -> Create) de type **Direct Connexion** et ayant pour adresse **localhost:27017**
    - Créer une database (clique droit sur votre connexion -> Create Database) avec pour nom **techWeb**
    - Ouvrir un shell sur votre database (clique droit sur votre database -> Open Shell) et copier le code prevenant du fichier **techWebBack/scripts/init.mongo.js**, puis valider (F5 ou en cliquant sur le bouton vert "Play")

## Démarrage
- Dans "techWebBack", démarrer le serveur à l'aide de la commande `npm run start:dev`
    - Le serveur est accessible via l'url http://0.0.0.0:3000/documentation
- Dans "techWebFront", démarrer l'application à l'aide de la commande `ng serve`
    - L'application est accessible via l'url http://localhost:4200/
