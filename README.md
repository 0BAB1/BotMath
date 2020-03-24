# Bot √x² = |x| formule est correcte !
> Ce bot en javascript permet de stocker pour vous contenus de cours et dvoirs a faire sous forme de texte, afin que tout le monde puisse y acceder a tout moment!
>il sert aussi d'outil de modération et quelques autrres fonctionalités !

# Déscription

le bot peut accompagner les élèves et les proffesseurs dans leur organisation en évitant certains de toujours soliciter leurs camarades pour les contenus des
cours et des devoirs, il peut aussi arreter les causeurs de troubles sur commande pour avoir de l'aide dans discord tapez tout simplement:
>!math help

## Installation des dépendances

linux & windows : après avoir installer node.js
```sh
npm install discord.js
```

```sh
npm install fs
```
## pour l'executer sur votre pc / server

dans le repertoire racine du projet (ou se touve index.js):
```sh
node index.js
```
un message de confirmation comme quoi le bot est pr^et s'affiche alors

## Pour contribuer

creez un nouvelle commande dans /commands/nomCommande.js, tout autre requete sera refusée et votre commande a ajouter doit etre UTILE !!

## Le config.json
pour des raison évidentes, le config.json ne figure pas dans ce dépot, voici a quoi le votre doir ressembler : 
```json
{
    "token" : "votre token",
    "prefix" : "!math"
}
```
il se trouve a la racine du projet

