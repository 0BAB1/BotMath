const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let devoirsArray = new Array;
    let stringDevoirs = new String;
    let k = new String;
    let allDevoirs = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last")
    {
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id) {
                stringDevoirs = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                k = i; //on sauvegarde l'id du dernier cours trouvé
            }
        }

        if(stringDevoirs.length > 0) {
            msg.channel.send(`Devoir du **${bot.devoirs[k].nom}** : *${stringDevoirs}*`);
        } else {
            msg.channel.send(`Aucune entrée n'a encore été saisie !`); //pour insulter l'utilisateur
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
                allDevoirs += `Devoir du **${bot.devoirs[i].nom}** : *${stringDevoirs}*` + "\n"; //on concatène tous les cours
            }
        }
        msg.channel.send(allDevoirs); //on affiche en une seule fois pour éviter de multiples alertes
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else
    {
        let nomAffiche = args[1];
        
        for(let i in bot.devoirs){
            if(bot.devoirs[i].guild == guildId && bot.devoirs[i].channel == msg.channel.id && bot.devoirs[i].nom == nomAffiche) {
                stringDevoirs = bot.devoirs[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                k = i; //on sauvegarde l'id du cours trouvé
                break; //pas la peine de continuer à chercher une entrée, on l'a déjà trouvée
            }
        }

        if(stringDevoirs.length > 0) {
            msg.channel.send(`Devoir du **${bot.devoirs[k].nom}** : *${stringDevoirs}*`);
        }
        else{
            msg.channel.send(`Aucun devoir nommé **${nomAffiche}**`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpDevoir",
    desc: "`Pemmet d'afficher un ou des des devoirs.\nEx : !math dumpDevoir last (affiche le dernier devoir).\nEx : !math dumpDevoir <nom> (affiche le devoir nommé)\nEx : !math dumpDevoir (affiche tous les devoirs)`"
}
