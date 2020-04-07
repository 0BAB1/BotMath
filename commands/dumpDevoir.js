const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let stringAffichage = 'Pas de devoir à afficher : `!math addDevoir <date> <contenu du devoir>` pour en ajouter.'; //message par défaut;
    let allDevoirs = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last") {
        //s'il existe au moins un devoir, cette boucle permet de modifier stringAffichage
        //sinon, elle reste à l'état d'origine, avec le message d'erreur
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id) {
                stringAffichage = `Devoir pour le **${bot.devoirs[i].nom}** : *${bot.devoirs[i].contenu}*.`;
            }
        }

        msg.channel.send(stringAffichage);
        return; //pour éviter l'affichage commun aux deux derniers cas
    }
    //===================================//
    //===========tout afficher===========//
    //===================================//
    else if(!args[1]) {
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].guild == msg.guild.id) {
                allDevoirs += `Devoir pour le **${bot.devoirs[i].nom}** : *${bot.devoirs[i].contenu}*.\n`; //on concatène tous les devoirs
            }
        }
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else {
        let nomDemande = args[1];
        
        for(let i in bot.devoirs){
            //on concatène tous les devoirs commençant par nomDemande
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].nom.startsWith(nomDemande)) {
                allDevoirs += `Devoir pour le **${bot.devoirs[i].nom}** : *${bot.devoirs[i].contenu}*.\n`
            }
        }

        //on change stringAffichage car il peut exister des devoirs, mais pas pour ce jour-là
        stringAffichage = `Il n'y a pas de devoir pour le **${nomDemande}**.`;
    }

    //code commun pour l'affichage des deux derniers cas
    if(allDevoirs.length > 0) {
        msg.channel.send(allDevoirs);
    } else {
        msg.channel.send(stringAffichage);
    }
}

module.exports.help = {
    name: "dumpDevoir",
    desc: "`Pemmet d'afficher un ou des des devoirs.\nEx : !math dumpDevoir last (affiche le dernier devoir).\nEx : !math dumpDevoir <nom> (affiche le devoir nommé)\nEx : !math dumpDevoir (affiche tous les devoirs)`"
}