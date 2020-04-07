const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let stringAffichage = 'Pas de cours à afficher : `!math addCours <date> <contenu du cours>` pour en ajouter.'; //message par défaut
    let allCours = new String;

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last") {
        //s'il existe au moins un cours, cette boucle permet de modifier stringAffichage
        //sinon, elle reste à l'état d'origine, avec le message d'erreur
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) {
                stringAffichage = `Cours du **${bot.cours[i].nom}** : *${bot.cours[i].contenu}*.`;
            }
        }

        msg.channel.send(stringAffichage);
        return; //pour éviter l'affichage commun aux deux derniers cas
    }
    //===================================//
    //===========tout afficher===========//
    //===================================//
    else if(!args[1]) {
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id) {
                allCours += `Cours du **${bot.cours[i].nom}** : *${bot.cours[i].contenu}*.\n`; //on concatène tous les cours
            }
        }        
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else {
        let nomDemande = args[1];
        
        for(let i in bot.cours){
            //on concatène tous les cours commençant par nomDemande
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].nom.startsWith(nomDemande)) {
                allCours += `Cours du **${bot.cours[i].nom}** : *${bot.cours[i].contenu}*.\n`
            }
        }

        //on change stringAffichage car il peut exister des cours, mais pas pour ce jour-là
        stringAffichage = `Il n'y a pas eu de cours le **${nomDemande}**.`
    }
    
    //code commun pour l'affichage des deux derniers cas
    if(allCours.length > 0) {
        msg.channel.send(allCours);
    } else {
        msg.channel.send(stringAffichage);
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`Permet d'afficher un ou des cours.\nEx : !math dumpCours last (affiche le dernier cours)\nEx : !math dumpCours <nom> (affiche le cours nommé)\nEx : !math dumpCours (affiche tous les cours)`"
}