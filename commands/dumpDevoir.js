const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let stringDevoirs = new String;
    let stringAffichage = "";
    let allDevoirs = new String;
    let mErr = 'Pas de devoir à afficher : `!math addDevoir <date> <contenu du devoir>` pour en ajouter.';

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last")
    {
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id) {
                stringDevoirs = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                stringAffichage = `Devoir pour le **${bot.devoirs[i].nom}** : *${stringDevoirs}*.`;
            }
        }

        if(stringDevoirs.length > 0) {
            msg.channel.send(stringAffichage);
        } else { //si on n'a rien à afficher
            msg.channel.send(mErr);
        }
        return;
    }
    //===================================//
    //===========tout afficher===========//
    //===================================//
    else if(!args[1])
    {
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].guild == msg.guild.id) 
            {
                stringDevoirs = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                allDevoirs += `Devoir pour le **${bot.devoirs[i].nom}** : *${stringDevoirs}*.\n`; //on concatène tous les devoirs
            }
        }

        //si on a rien a afficher
        if(stringDevoirs.length == 0) {
            return msg.channel.send(mErr);
        }

        msg.channel.send(allDevoirs); //on affiche en une seule fois pour éviter de multiples alertes
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else
    {
        let nomDemande = args[1];
        
        for(let i in bot.devoirs){
            //on concatène tous les devoirs commençant par nomAffiche
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].nom.startsWith(nomDemande)) {
                stringDevoirs = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                stringAffichage += `Devoir pour le **${bot.devoirs[i].nom}** : *${stringDevoirs}*.\n`
            }
        }

        if(stringDevoirs.length > 0) {
            msg.channel.send(stringAffichage);
        }
        else{
            msg.channel.send(`Il n'y a pas de devoir pour le **${nomDemande}**.`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpDevoir",
    desc: "`Pemmet d'afficher un ou des des devoirs.\nEx : !math dumpDevoir last (affiche le dernier devoir).\nEx : !math dumpDevoir <nom> (affiche le devoir nommé)\nEx : !math dumpDevoir (affiche tous les devoirs)`"
}