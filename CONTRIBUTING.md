# pour contribuer

nous ne prenons que les nouvelles idées de commandes utilies et prêtes a l'emplois
>creez tout simplement votre nouvelle commande dans commands/<nomCommande>.js

# base d'une commande

```javascript
const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    //le code de la commande
}

module.exports.help = {
    name: "nomCommande",
    desc: "`decription de votre commande pour !math help`"
}
```
bonne chance !

# pour executer le bot chez vous

voici un tutoriel (par moi même) avec les bases : https://youtu.be/ptctgM9_jTU
