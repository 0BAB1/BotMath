# Bot Math Avec interface Web Management ! [version de tets]
> Ce bot en javascript permet de stocker pour vous les contenus de cours et devoirs à faire sous forme de texte, afin que tout le monde puisse y accéder à tout moment 

#interface Web (en test)
>le site est centralisé, un seul server mais chaque utilisateur aura sa propre interface vu que tout le monde n'est pas dans le meme server
>Il sert aussi d'outil de modération et permet d'afficher les horaires de cours.
>Les cours/devoirs a rendre (prof comme élèves) pouront etre deposer sur le site Web centralisé
>tout sera trié en fonction du compte utilisateur
>l'interface Web regroupe aussi une documentation sur l'utilisation du bot
>une vue d'ensemble sur l'etat du bot dans son server (perso) sera disponible
>un systeme de "tuteurs", si vous etes admin sur votre serv discord, tout les coptes associé a un compte discord qui n'est pas admin dans votre server discord sera sous votre "tutorat". Ils seront considérés comme vos élèves, pour eviter que des petits malins s'amuse a se faire passer comm mebres d'autres servers.

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
