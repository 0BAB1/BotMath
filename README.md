# Bot √x² = |x|
> Ce bot en javascript permet de stocker pour vous les contenus de cours et devoirs à faire sous forme de texte, afin que tout le monde puisse y accéder à tout moment !
>Il sert aussi d'outil de modération et permet d'afficher les horaires de cours.

# Description

Le bot peut accompagner les élèves et les professeurs dans leur organisation en évitant les solicitations trop de solicitations personnalles pour connaître les contenus des cours et des devoirs.
Il permet aussi de réduite au slience les causeurs de trouble.
Pour avoir de l'aide dans discord tapez tout simplement :
>!math help

## Installation des dépendances

Linux & Windows : après avoir installé node.js
```sh
npm install discord.js
```

```sh
npm install fs
```
## Pour l'exécuter sur votre pc / serveur

Dans le repertoire racine du projet (ou se touve index.js) :
```sh
node index.js
```
Un message de confirmation comme quoi le bot est prêt s'affiche alors.

## Pour contribuer

Créez un nouvelle commande dans /commands/nomCommande.js, tout autre requête sera refusée.
Votre commande à ajouter doit etre utile !

## Le config.json
Pour des raison évidentes, le config.json ne figure pas dans ce dépot, voici a quoi le votre doit ressembler : 
```json
{
    "token" : "votre token",
    "prefix" : "!math"
}
```
Il se trouve à la racine du projet.