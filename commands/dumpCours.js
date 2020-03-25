const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (bot, msg, args) =>{
    let guildId = msg.guild.id;
    let stringCours = new String;
    let stringAffichage = "";
    let allCours = new String;
    let mErr = 'Pas de cours à afficher : `!math addCours <date> <contenu du cours>` pour en ajouter.';

    //===================================//
    //=====afficher le dernier cours=====//
    //===================================//
    if(args[1] === "last")
    {
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id) {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                stringAffichage = `Cours du **${bot.cours[i].nom}** : *${stringCours}*.`;
            }
        }

        if(stringCours.length > 0) {
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
        for(let i in bot.cours){
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].guild == msg.guild.id) 
            {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                allCours += `Cours du **${bot.cours[i].nom}** : *${stringCours}*.\n`; //on concatène tous les cours
            }
        }

        //si on a rien a afficher
        if(stringCours.length == 0) {
            return msg.channel.send(mErr);
        }

        msg.channel.send(allCours); //on affiche en une seule fois pour éviter de multiples alertes
    }
    //===================================//
    //======afficher le cours voulu======//
    //===================================//
    else
    {
        let nomDemande = args[1];
        
        for(let i in bot.cours){
            //on concatène tous les cours commençant par nomAffiche
            if(bot.cours[i].guild == guildId && bot.cours[i].channel == msg.channel.id && bot.cours[i].nom.startsWith(nomDemande)) {
                stringCours = bot.cours[i].contenu.join(" "); // traitement pour avoir une belle string a afficher
                stringAffichage += `Cours du **${bot.cours[i].nom}** : *${stringCours}*.\n`
            }
        }
        
        if(stringCours.length > 0) {
            msg.channel.send(stringAffichage);
        }
        else{
            msg.channel.send(`Il n'y a pas eu de cours le **${nomDemande}**.`);
        }
        return;
    }
}

module.exports.help = {
    name: "dumpCours",
    desc: "`Permet d'afficher un ou des cours.\nEx : !math dumpCours last (affiche le dernier cours)\nEx : !math dumpCours <nom> (affiche le cours nommé)\nEx : !math dumpCours (affiche tous les cours)`"
}