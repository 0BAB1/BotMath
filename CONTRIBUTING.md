# Pour contribuer

Nous ne prenons que les nouvelles idées de commandes utiles et prêtes à l'emploi.
>Créez tout simplement votre nouvelle commande dans un fichier commands/nomCommande.js

# Base d'une commande

```javascript
const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    //le code de la commande
}

module.exports.help = {
    name: "nomCommande",
    desc: "`decription de votre commande pour !math <nomCommande>`"
}
```
Bonne chance !

# Pour exécuter le bot chez vous

Voici un tutoriel (par moi-même) avec les bases : https://youtu.be/ptctgM9_jTU
