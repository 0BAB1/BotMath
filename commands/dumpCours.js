const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let coursArray = new Array;
    let stringCours = new String;
    let k = new String;
    let allCours = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last")
    {
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                k = i; //on sauvegarde l'id du dernier cours trouvé
            }
        }

        if(stringCours.length > 0) {
            msg.channel.send(`Cours du **${bot.cours[k].nom}** : *${stringCours}*`);
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
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id) 
            {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                allCours += `Cours du **${bot.cours[i].nom}** : *${stringCours}*` + "\n"; //on concatène tous les cours
            }
        }
        msg.channel.send(allCours); //on affiche en une seule fois pour éviter de multiples alertes
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else
    {
        let nomAffiche = args[1];
        
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].nom == nomAffiche) {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                k = i; //on sauvegarde l'id du cours trouvé
                break; //pas la peine de continuer à chercher une entrée, on l'a déjà trouvée
            }
        }

        if(stringCours.length > 0) {
            msg.channel.send(`Cours du **${bot.cours[k].nom}** : *${stringCours}*`);
        }
        else{
            msg.channel.send(`Aucun cours nommé **${nomAffiche}**`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`Permet d'afficher un ou des cours.\nEx : !math dumpCours last (affiche le dernier cours)\nEx : !math dumpCours <nom> (affiche le cours nommé)\nEx : !math dumpCours (affiche tous les cours)`"
}
